import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import { ErrorType } from "../components/Error/Type";
import { AuthenticationClient } from "../lib/AuthenticationClient";
import { AUTH_CONFIG } from "../lib/Constants";
import { setCookie } from "cookies-next";
import validateCookie from "../lib/validateCookie";
import ErrorMessage from "../components/Error/Message";
import ResourceMain from "../components/Resource/Main";
import useCookies from "../hooks/useCookies";

/**
 * @group Pages
 */
function ViewPages(props: any) {
  const [loading, setLoading] = useState<boolean>(true);
  const [foundError, setFoundError] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType<string>>({});
  const [selectedSection, setSelectedSection] = useState<string>("");
  const { getCookieByKey } = useCookies("section");

  useEffect(() => {
    if (!getCookieByKey("section")["id"]) {
      setError({
        code: "NoCookie",
        message: "Cookie was not found",
      });
      setFoundError(true);
      setLoading(false);
    }

    if (props["error"]) {
      setError(props.error);
      setFoundError(true);
      setLoading(false);
    }

    setSelectedSection(getCookieByKey("section")["displayName"]);

    if (props.value) {
      localStorage.setItem("templates", JSON.stringify(props.value));
      return setLoading(false);
    }
  }, [props, getCookieByKey]);

  return loading ? (
    <p className="text-center py-5 italic">Loading...</p>
  ) : foundError ? (
    <ErrorMessage error={error} />
  ) : (
    <div className="container mx-auto">
      <h1 className="prose-2xl text-neutral-700 mx-auto text-center py-5">
        {selectedSection}
      </h1>

      <ResourceMain
        resource={props.value}
        cookieKey="page"
        tableCookieKey="page"
        headers={["Page Title", "OneNote Link", "Creation Date"]}
      />
    </div>
  );
}

/**
 * @ignore
 */
export async function getServerSideProps(context: NextPageContext) {
  const parsedSection = validateCookie({ cookie: context, key: "section" });
  const sectionId = parsedSection.id;

  const client = AuthenticationClient.init({
    ...AUTH_CONFIG,
    resource: `onenote/sections/${sectionId}/pages`,
  });
  const request = await client.api({ context });
  const response = await request.executeRequest({
    shouldReturnProps: true,
  });

  const templates: any = [];
  if (response.props.value) {
    response.props.value.map((page: any) => {
      templates.push({
        id: page.id,
        title: page.title,
        contentUrl: page.contentUrl,
      });
    });
  }

  setCookie("templates", JSON.stringify(templates), {
    req: context.req,
    res: context.res,
    sameSite: "lax",
    path: "/",
  });

  return response;
}

export default ViewPages;
