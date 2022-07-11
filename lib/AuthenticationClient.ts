import { GraphRequest } from "./GraphRequest";
import { IClientOptions } from "./IClientOptions";

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

  public api() {
    return new GraphRequest(this.config);
  }
}

export { AuthenticationClient };
