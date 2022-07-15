import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequest, NextApiResponse, NextPageContext } from "next";
import { GraphRequest } from "./GraphRequest";
import { IClientOptions } from "./IClientOptions";

type ApiConfig = {
  context?: NextPageContext | undefined;
  resource?: string;
  apiRes?: NextApiResponse | undefined;
  apiReq?: NextApiRequest | undefined;
};

class AuthenticationClient {
  /** Configuration to initialize the client with */
  private config: IClientOptions;

  private constructor(clientOptions: IClientOptions) {
    this.config = clientOptions;
  }

  /** Initialize the client through its private constructor */
  public static init(options: IClientOptions) {
    const clientOptions: IClientOptions = {};

    // Append properties passed to init() and append them to the clientOptions object.
    for (const i in options) {
      if (Object.prototype.hasOwnProperty.call(options, i)) {
        clientOptions[i as keyof IClientOptions] =
          options[i as keyof IClientOptions];
      }
    }

    return new AuthenticationClient(options);
  }

  public async api({ context, resource = "", apiRes, apiReq }: ApiConfig) {
    if (resource) {
      this.config = {
        ...this.config,
        resource,
      };
    }

    let response: ServerResponse | NextApiResponse | undefined = undefined;
    let request: IncomingMessage | NextApiRequest | undefined = undefined;

    if (context) {
      response = context.res;
      request = context.req;
    }

    if (apiRes && apiReq) {
      response = apiRes;
      request = apiReq;
    }

    return await GraphRequest.init({
      config: this.config,
      req: request,
      res: response,
    });
  }
}

export { AuthenticationClient };
