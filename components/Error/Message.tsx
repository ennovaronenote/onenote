import { ErrorType } from "./Type";

/**
 * @group Components
 * @returns
 */
function ErrorMessage({ error }: { error: ErrorType<any> }) {
  if (!error) return <></>;

  const errorCode = (
    <p className="text-center" suppressHydrationWarning>
      Code: {error.code}
    </p>
  );
  const errorMessage = (
    <p className="text-center" suppressHydrationWarning>
      Message: {error.message}
    </p>
  );

  return (
    <div className="container mx-auto" suppressHydrationWarning>
      <div
        className="text-center text-red-500 text-xl py-3"
        suppressHydrationWarning
      >
        An error has occurred! See more details below.
      </div>

      <div className="container" suppressHydrationWarning>
        {error.code && errorCode}
        {error.message && errorMessage}
      </div>
    </div>
  );
}

export default ErrorMessage;
