import {
  CookieValueTypes,
  getCookie,
  hasCookie,
  setCookie,
} from "cookies-next";
import { NextPageContext } from "next";
import { IClientOptions } from "./IClientOptions";

class GraphRequest {
  #token: CookieValueTypes | string;
  config: IClientOptions;

  private constructor(
    config: IClientOptions,
    token: CookieValueTypes | string
  ) {
    this.config = config;
    this.#token = token;
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
      const cookieOptions = { req: context.req, res: context.res };
      const tokenExists = hasCookie("token", cookieOptions);
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
      const graphRequest = await fetch(
        "https://login.microsoftonline.com/9763eb70-4bf9-4403-84be-2bd40118e7f2/oauth2/v2.0/token",
        graphRequestOptions
      );
      const graphResponse = await graphRequest.json();

      // If there was a valid access token response, send it to an HttpOnly cookie and return the instance
      if (graphResponse["access_token"]) {
        setCookie("token", graphResponse["access_token"], cookieOptions);
        return new GraphRequest(config, graphResponse["access_token"]);
      }

      return new GraphRequest(config, "");
    } catch (e) {
      console.error(`Error at GraphRequest class: ${JSON.stringify(e)}`);
      return new GraphRequest(config, "");
    }
  }

  executeRequest() {
    if (!this.#token) return;
  }
}

export { GraphRequest };
