/**
 * @module Constants
 */

import { IClientOptions } from "./IClientOptions";

/**
 * @constant
 * Default API Endpoint version.
 */
export const GRAPH_API_VERSION = "v1.0";

/**
 * @constant
 * Default URL for Graph requests.
 */
export const GRAPH_BASE_URL = "http://graph.microsoft.com/";

/**
 * @constant
 * Default options to provide to {@link AuthenticationClient}
 */
export const AUTH_CONFIG: IClientOptions = {
  baseUrl: GRAPH_BASE_URL + GRAPH_API_VERSION,
  userSelector: "users/0ec189a6-d8ce-4bbb-ae3c-fdffde71d6a7",
  resource: "",
};
