import { IClientOptions } from "./IClientOptions";

/**
 * @constant
 * Default API Endpoint version.
 * @category Configuration
 */
const GRAPH_API_VERSION: string = "v1.0";

/**
 * @constant
 * Default URL for Graph requests.
 * @category Configuration
 */
const GRAPH_BASE_URL: string = "http://graph.microsoft.com/";

/**
 * @constant
 * Default options to provide to {@link AuthenticationClient}
 * @category Configuration
 */
const AUTH_CONFIG: IClientOptions = {
  baseUrl: GRAPH_BASE_URL + GRAPH_API_VERSION,
  userSelector: "users/0ec189a6-d8ce-4bbb-ae3c-fdffde71d6a7",
  resource: "",
};

export { GRAPH_API_VERSION, GRAPH_BASE_URL, AUTH_CONFIG };
