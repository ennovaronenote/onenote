import { NextPageContext } from "next";
import { GraphRequest } from "./GraphRequest";
import { IClientOptions } from "./IClientOptions";

type ApiConfig = {
  context?: any;
  resource?: string;
  userSelector?: string;
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

  public async api({ context, resource = "", userSelector = "" }: ApiConfig) {
    if (resource) {
      this.config = {
        ...this.config,
        resource,
      };
    }

    if (userSelector) {
      this.config = {
        ...this.config,
        userSelector,
      };
    }

    const { req, res } = context;

    return await GraphRequest.init({
      config: this.config,
      req,
      res,
    });
  }
}

export { AuthenticationClient };
