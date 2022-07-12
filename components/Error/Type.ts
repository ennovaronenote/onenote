type InnerErrorType = {
  date?: string;
  "request-id"?: string;
  "client-request-id"?: string;
};

type ErrorType<T> = {
  code?: T;
  message?: string;
  innerError?: InnerErrorType;
};

export type { ErrorType, InnerErrorType };
