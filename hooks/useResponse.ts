import { useEffect, useState } from "react";
import { ErrorType } from "../components/Error/Type";
import { Debug } from "../lib/Debug";
import useCookies from "./useCookies";

type HandleResponseProps = {
  cookieName: string;
  propertyToValidate: string;
  pageProps?: any;
};

/**
 * @group Components
 * @param options
 */
function useResponse(options: HandleResponseProps) {
  const { getCookieByKey } = useCookies(options.cookieName);
  const { pageProps = {} } = options;
  const [error, setError] = useState<ErrorType<string>>({ error: false });
  const [selectedData, setSelectedData] = useState<string>("");
  const [cookieData, setCookieData] = useState<any>();

  useEffect(() => {
    const data = getCookieByKey(options.cookieName);
    const suppliedPageProps = Object.keys(pageProps).length !== 0;

    // Validate ID property of cookie
    if (!data["id"]) {
      setError({
        error: true,
        code: "NoCookie",
        message: `Cookie was not found for key: ${options.cookieName}`,
      });
    }

    // Response if MSGraph request returned an error
    if (suppliedPageProps && pageProps["error"]) {
      setError({
        error: true,
        ...pageProps.error,
      });
    }

    // Ensures there's a display name/title to render.
    const { displayName } = data;
    if (displayName) {
      setSelectedData(displayName);
    }

    // Debug class is created and will console.log() any object specified as long as an environment variable is set
    const debug = Debug.init({
      debugSrc: "hooks/useResponse.ts",
      data,
      debugType: "object",
      suppliedPageProps,
      selectedData,
      error,
      pageProps,
      shouldDebug: true,
    });
    debug.printDebugOutput();

    setCookieData(data);
  }, []);

  return {
    error,
    selectedData,
    cookieData,
  };
}

export type { HandleResponseProps };
export default useResponse;
