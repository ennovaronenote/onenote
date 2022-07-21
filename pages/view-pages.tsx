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
import getTemplates from "../lib/getTemplates";
import PageTitle from "../components/PageTitle";

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
      <PageTitle title={selectedSection} />

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
  const templates = await getTemplates(context);
  const defaultTemplates = {
    redirect: {
      permanent: false,
      destination: "/view-sections",
    },
    props: {
      error: true,
    },
  };

  console.log(templates);
  if (!templates || !templates.props) return defaultTemplates;

  if (templates.props.error) {
    return {
      redirect: {
        permanent: false,
        destination: "/view-sections",
      },
      props: {},
    };
  }

  return templates;
}

export default ViewPages;
