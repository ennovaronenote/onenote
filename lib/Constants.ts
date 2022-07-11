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
  baseUrl: GRAPH_BASE_URL,
};
