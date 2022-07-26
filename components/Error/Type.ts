type InnerErrorType = {
  date?: string;
  "request-id"?: string;
  "client-request-id"?: string;
};

/**
 * @group Types
 * @category Components
 */
type ErrorType<T> = {
  error?: boolean;
  code?: T;
  message?: string;
  innerError?: InnerErrorType;
};

export type { ErrorType, InnerErrorType };
