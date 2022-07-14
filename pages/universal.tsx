import { NextPageContext } from "next";
import { useEffect } from "react";
import { AuthenticationClient } from "../lib/AuthenticationClient";
import { AUTH_CONFIG } from "../lib/Constants";
import useResponse from "../hooks/useResponse";
import { useRouter } from "next/router";

/**
 * @group Pages
 */
function Universal(props: any) {
  const router = useRouter();

  const { error, selectedData, cookieData } = useResponse({
    cookieName: "notebook",
    propertyToValidate: "",
    pageProps: props,
  });

  useEffect(() => {
    if (cookieData) {
      router.replace({
        pathname: "/universal",
        query: { requestUrl: cookieData.link.graphResource },
      });
    }
  }, [error, selectedData]);

  return <div></div>;
}

/** @ignore */
export async function getServerSideProps(context: NextPageContext) {
  const client = AuthenticationClient.init({
    ...AUTH_CONFIG,
  });
  if (typeof context.query.requestUrl !== "string") return {};

  const requestUrl: string = context.query.requestUrl || "";
  const apiTest = await client.api(context, requestUrl);
  const apiTestTest = await apiTest.executeRequest(true);

  return {
    props: {
      message: "Serverside Props",
    },
  };

  const notebooksRequest = await client.api(context, "onenote/notebooks");
  const notebooks = await notebooksRequest.executeRequest(true);
  return notebooks;

  const sectionsRequest = await client.api(context, "onenote/sections");
  const sections = await sectionsRequest.executeRequest(true);

  return sections;
}

export default Universal;
