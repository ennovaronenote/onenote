import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import ResourceMain from "../components/Resource/Main";
import useCookies from "../hooks/useCookies";
import getTemplates from "../lib/getTemplates";
import PageTitle from "../components/PageTitle";

/**
 * @group Pages
 */
function ViewPages(props: any) {
  const [selectedSection, setSelectedSection] = useState<string>("");
  const { getCookieByKey } = useCookies("section");

  useEffect(() => {
    setSelectedSection(getCookieByKey("section")["displayName"]);

    if (props.value && props.value.length !== 0) {
      localStorage.setItem("templates", JSON.stringify(props.value));
    }
  }, [props, getCookieByKey]);

  return (
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
