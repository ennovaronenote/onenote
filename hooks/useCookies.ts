import { useEffect, useState } from "react";
import { serialize, parse } from "cookie";
import { CookieSerializeOptions } from "next/dist/server/web/types";

const useCookies = (cookieName: string) => {
  const [activeCookie, setActiveCookie] = useState<any>({});

  const setCookieData = (cookieData: any) => {
    try {
      const options: CookieSerializeOptions = { sameSite: "lax" };
      const newCookie = serialize(
        cookieName,
        JSON.stringify(cookieData),
        options
      );

      document.cookie = newCookie;
      if (!cookieData) return;
      setActiveCookie(cookieData);
    } catch (e) {
      console.error(`Error setting new cookie ${e}`);
    }
  };

  const getCookieByKey = (key: string): any => {
    if (typeof window === "undefined") return false;
    try {
      const cookies = parse(document.cookie);
      if (!cookies[key]) {
        document.cookie = `${key}="";SameSite=lax`;
        return {
          error: {
            code: "BadCookie",
            message: `Invalid cookie requested: ${key}`,
          },
        };
      }

      const parsed = JSON.parse(cookies[key]);
      return parsed;
      //if (parsed.displayName) setActiveCookie(parsed);
    } catch (e) {
      console.error(`Error retrieving cookie by key ${e}`);
    }

    return { id: 0 };
  };

  useEffect(() => {
    if (cookieName) setActiveCookie(getCookieByKey(cookieName));
  }, [cookieName]);

  return {
    activeCookie,
    getCookieByKey,
    setCookieData,
  };
};

export default useCookies;
