import {
  CookieValueTypes,
  getCookie,
  hasCookie,
  setCookie,
} from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";
import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequest, NextApiResponse, NextPageContext } from "next";
import { Debug } from "./Debug";
import { IClientOptions } from "./IClientOptions";

type GraphInit = {
  config: IClientOptions;
  req: any;
  res: any;
};

class GraphRequest {
  /** Access token to send with headers */
  #token: CookieValueTypes | string;

  /** Complete URL to submit API requests */
  #requestUrl: string;

  /** Configuration options so the request knows the URL, type of request, etc... */
  config: IClientOptions;

  private constructor(
    config: IClientOptions,
    token: CookieValueTypes | string
  ) {
    this.config = config;
    this.#token = token;
    this.#requestUrl = "";
  }

  /**
   * Initializer function to easily ensure that access tokens are read before completing a request.
   * @param config
   * @param context
   * @returns A class, GraphRequest, which holds the methods to make API requests.
   */
  static async init({ config, req, res }: GraphInit): Promise<GraphRequest> {
    try {
      const cookieOptions: OptionsType = {
        req,
        res,
        maxAge: 0,
        sameSite: "lax",
      };
      const tokenExists = hasCookie("token", cookieOptions);

      // Return instance without requesting new access token to prevent unnecessary requests
      if (tokenExists)
        return new GraphRequest(config, getCookie("token", cookieOptions));

      // Fetch options for Microsoft's OAuth Authorization Flow
      const graphRequestOptions: RequestInit = {
        method: "POST",
        body: new URLSearchParams({
          client_id: process.env.CLIENT_ID || "",
          scope: process.env.CLIENT_SCOPE || "",
          client_secret: process.env.CLIENT_SECRET || "",
          grant_type: "client_credentials",
        }),
      };

      // Retrieve access_token from OAuth Authorization Flow
      const graphRequest = await fetch(
        "https://login.microsoftonline.com/9763eb70-4bf9-4403-84be-2bd40118e7f2/oauth2/v2.0/token",
        graphRequestOptions
      );
      const graphResponse = await graphRequest.json();

      // Easier way to store errors / access token
      const accessToken = graphResponse["access_token"];
      const maxAge: number = graphResponse["expires_in"];
      const error = graphResponse["error"];

      // If there was a valid access token response, send it to an HttpOnly cookie and return the instance
      if (accessToken) {
        if (maxAge) cookieOptions["maxAge"] = maxAge;
        setCookie("token", accessToken, cookieOptions);
        return new GraphRequest(config, accessToken);
      }

      if (error) {
        console.error(`Error with access token: ${error}`);
        return new GraphRequest(config, "");
      }

      return new GraphRequest(config, "");
    } catch (e) {
      console.error(`Error at GraphRequest class: ${JSON.stringify(e)}`);
      return new GraphRequest(config, "");
    }
  }

  /**
   * Public function for user to complete their API request after receiving the proper access tokens.
   * @returns Data returned from Microsoft Graph
   */
  async executeRequest({
    body = JSON.stringify({}),
    shouldReturnProps = false,
    method = "GET",
    contentType = "application/json",
  }) {
    this.constructUrl();
    if (!this.#token) return;
    if (!this.#requestUrl) return;

    try {
      const graphRequestOptions: any = {
        method,
        headers: {
          Authorization: `Bearer ${this.#token}`,
          "Content-Type": contentType,
        },
      };

      if (method !== "GET") graphRequestOptions["body"] = body;

      const graphRequest = await fetch(this.#requestUrl, graphRequestOptions);
      const graphResponse = await graphRequest.json();

      // DEBUG
      const debugOutput = {
        url: this.#requestUrl,
        debugSrc: "lib/GraphRequest.ts",
        body,
        method,
        contentType,
        shouldDebug: false,
        request: JSON.stringify(graphRequest),
        response: JSON.stringify(graphResponse),
      };

      let returnedResponse: any = {
        ...graphResponse,
        debugOutput,
      };

      if (shouldReturnProps) {
        returnedResponse = {
          props: {
            ...graphResponse,
            debugOutput,
          },
        };
      }

      const debug = Debug.init(debugOutput);
      debug.printDebugOutput();

      return returnedResponse;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Construct a url that combines a proper link to request a Microsoft Graph resource.
   * @private
   * @returns If invalid, an empty string. Otherwise, the complete URL for the API request.
   */
  constructUrl(): string {
    const { baseUrl = "", userSelector = "" } = this.config;

    if (userSelector?.charAt(0) === "/")
      this.config.userSelector = userSelector.substring(1);

    function parseResource(urlLength: number, resource?: string): string {
      let resourceCopy = resource || "";
      if (!resourceCopy) return "";

      if (resourceCopy.charAt(0) === "/")
        resourceCopy = resourceCopy.substring(1);

      const checkResource = resourceCopy.substring(0, urlLength);
      if (checkResource === baseUrl || checkResource === userSelector) {
        return parseResource(
          userSelector.length,
          resourceCopy.substring(checkResource.length)
        );
      }

      return resourceCopy;
    }

    this.config.resource = parseResource(baseUrl.length, this.config.resource);

    if (baseUrl && userSelector && this.config.resource) {
      this.#requestUrl = `${baseUrl}/${userSelector}/${this.config.resource}`;
    }

    if (!this.config.resource) {
      this.#requestUrl = `${baseUrl}/${userSelector}`;
    }

    if (!userSelector) {
      this.#requestUrl = "";
    }

    return this.#requestUrl;
  }
}

export { GraphRequest };
