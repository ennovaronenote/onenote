import { ErrorType } from "./Type";

/**
 * @group Components
 * @returns
 */
function ErrorMessage({ error }: { error: ErrorType<any> }) {
  if (!error) return <></>;

  const errorCode = <p className="text-center">Code: {error.code}</p>;
  const errorMessage = <p className="text-center">Message: {error.message}</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-red-500 text-xl py-3">
        An error has occurred! See more details below.
      </h1>

      <div className="container">
        {error.code && errorCode}
        {error.message && errorMessage}
      </div>
    </div>
  );
}

export default ErrorMessage;
