import { IClientOptions } from "./IClientOptions";

class GraphRequest {
  constructor(config: IClientOptions) {
    this.authenticate();
  }

  private async authenticate() {
    // Only run requests if they are serverside.
    if (typeof window !== "undefined") return;

    const token = await fetch("http://localhost:3000/api/authorize");
    const tokenResponse = await token.json();

    console.log(tokenResponse);
  }
}

export { GraphRequest };
