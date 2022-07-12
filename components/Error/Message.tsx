import { ErrorType } from "./Type";

function ErrorMessage({ error }: { error: ErrorType<any> }) {
  if (!error) return <></>;

  const errorCode = <p className="text-center">Code: {error.code}</p>;
  const errorMessage = <p className="text-center">Message: {error.message}</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-center">
        An error has occurred! See more details below.
      </h1>

      <div className="container">
        {error.message && errorMessage}

        {error.code && errorCode}
      </div>
    </div>
  );
}

export default ErrorMessage;
