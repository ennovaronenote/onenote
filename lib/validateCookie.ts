import { parse } from "cookie";
import { setCookie } from "cookies-next";
import { NextPageContext } from "next";

type RequestedCookie<T> = {
  cookie: T;
  key: string | undefined;
};

function validateCookie(context: RequestedCookie<any>) {
  const { cookie } = context.cookie.req.headers || context;
  const cookies = parse(cookie || "");
  const amountOfCookies = Object.keys(cookies).length;

  if (amountOfCookies === 0) {
    return {
      props: {
        error: {
          code: "NoCookies",
          message: "No cookies were found! Are you in the right spot?",
        },
      },
    };
  }

  if (context["key"]) {
    if (amountOfCookies !== 0 && !cookies[context["key"]]) {
      setCookie(context.key, JSON.stringify({}), {
        req: context.cookie.req,
        res: context.cookie.res,
        sameSite: "lax",
      });

      return {
        props: {
          error: {
            code: "BadResource",
            message: "The selected resource was not found.",
          },
        },
      };
    }

    try {
      const parsedCookie = JSON.parse(cookies[context["key"]]);
      return parsedCookie;
    } catch (e) {
      console.error(`Error in validateCookie (${e})`);
      return e;
    }
  }

  return { error: true };
}

export default validateCookie;
