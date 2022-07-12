import {
  CookieValueTypes,
  getCookie,
  hasCookie,
  setCookie,
} from "cookies-next";
import { NextPageContext } from "next";
import { IClientOptions } from "./IClientOptions";

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
  static async init(
    config: IClientOptions,
    context: NextPageContext
  ): Promise<GraphRequest> {
    try {
      const { req, res } = context;
      const cookieOptions = { req, res, maxAge: 0 };
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
  async executeRequest() {
    this.constructUrl();
    if (!this.#token) return;
    if (!this.#requestUrl) return;

    try {
      const graphRequest = await fetch(this.#requestUrl, {
        headers: {
          Authorization: `Bearer ${this.#token}`,
        },
      });
      const graphResponse = await graphRequest.json();

      return graphResponse;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Construct a url that combines a proper link to request a Microsoft Graph resource.
   * @private
   * @returns If invalid, an empty string. Otherwise, the complete URL for the API request.
   */
  private constructUrl(): string {
    const { baseUrl, userSelector, resource } = this.config;

    if (userSelector?.charAt(0) === "/")
      this.config.userSelector = userSelector.substring(1);

    if (resource?.charAt(0) === "/")
      this.config.resource = resource.substring(1);

    if (baseUrl && userSelector && resource) {
      this.#requestUrl = `${baseUrl}/${userSelector}/${resource}`;
    }

    if (!resource) {
      this.#requestUrl = `${baseUrl}/${userSelector}`;
    }

    if (!userSelector) {
      this.#requestUrl = "";
    }

    return this.#requestUrl;
  }
}

export { GraphRequest };
