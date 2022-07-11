import { IClientOptions } from "./IClientOptions";

class GraphRequest {
  #token: string;

  constructor(config: IClientOptions) {
    this.#token = "";
    this.authenticate();
  }

  get token() {
    return this.#token;
  }

  set token(newToken: string) {
    this.#token = newToken;
  }

  public executeRequest() {
    // Only run requests if they are serverside.
    if (typeof window !== "undefined") return;
    console.log(`Token: ${this.#token}`);
  }

  private async authenticate() {
    // Only run requests if they are serverside.
    if (typeof window !== "undefined") return "Serverside Requests Only";

    const tokenRequest = await fetch("http://localhost:3000/api/authorize");
    const tokenResponse = await tokenRequest.json();

    if (tokenResponse["access_token"])
      this.token = tokenResponse["access_token"];
  }
}

export { GraphRequest };
