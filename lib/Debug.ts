type DebugOptions = {
  [key: string]: any;
};

class Debug {
  #config: DebugOptions;
  #debugStartText: string;
  #debugFinishText: string;

  private constructor(options: DebugOptions) {
    this.#config = options;
    this.#debugStartText = "/*********DEBUG START*********\\";
    this.#debugFinishText = "/*********DEBUG FINISH*********\\";
  }

  static init(config?: DebugOptions): Debug {
    const defaultConfig = {
      error: false,
      genericMessage: "",
      debugType: "keyByKey",
      shouldDebug: process.env.NEXT_PUBLIC_DEBUG || false,
    };

    const options = Object.assign(defaultConfig, config || {});
    return new Debug(options);
  }

  printDebugOutput(): boolean {
    if (!this.#config.shouldDebug) return false;

    const configOptions = Object.entries(this.#config) || [];

    if (this.#config.debugType === "object") {
      console.log(this.#debugStartText);
      console.log(this.#config);
      console.log(this.#debugFinishText);
      return true;
    }

    if (configOptions.length === 0) {
      console.log(this.#debugStartText);
      console.log("Error: true");
      console.log("No config options were supplied to the Debug client.");
      console.log(this.#debugFinishText);
      return true;
    }

    console.log(this.#debugStartText);
    configOptions.map((option: [string, any]) => {
      const [key, value] = option;
      console.log(`${key} = ${JSON.stringify(value)}`);
    });
    console.log(this.#debugFinishText);

    return true;
  }
}

export type { DebugOptions };
export { Debug };
