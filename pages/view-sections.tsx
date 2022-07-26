import { NextPageContext } from "next";
import { AuthenticationClient } from "../lib/AuthenticationClient";
import { AUTH_CONFIG } from "../lib/Constants";
import { useEffect, useState } from "react";
import { ErrorType } from "../components/Error/Type";
import ResourceMain from "../components/Resource/Main";
import ErrorMessage from "../components/Error/Message";
import useCookies from "../hooks/useCookies";
import validateCookie from "../lib/validateCookie";
import PageTitle from "../components/PageTitle";

/**
 * Page to view list of sections. This page needs a notebook ID to make a graph request, so it validates the selected notebook via cookies.
 * @see {@link ViewNotebooks}
 * @group Pages
 * @returns
 */
function ViewSections(props: any) {
  const [foundError, setFoundError] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType<string>>({});
  const [selectedNotebook, setSelectedNotebook] = useState<string>("");
  const { getCookieByKey } = useCookies("section");

  useEffect(() => {
    if (!getCookieByKey("notebook")["id"]) {
      setError({
        code: "NoCookie",
        message: "Cookie was not found",
      });
      setFoundError(true);
    }

    if (props["error"]) {
      setError(props.error);
      setFoundError(true);
    }

    setSelectedNotebook(getCookieByKey("notebook")["displayName"]);
    if (props.value) setFoundError(false);
  }, [props, getCookieByKey]);

  return foundError ? (
    <ErrorMessage error={error} />
  ) : (
    <>
      <PageTitle title={selectedNotebook} />

      <ResourceMain
        resource={props.value}
        cookieKey="section"
        tableCookieKey="section"
        headers={["Section Title", "OneNote Link", "Creation Date"]}
      />
    </>
  );
}

/** @ignore */
export async function getServerSideProps(context: NextPageContext) {
  const parsedNotebook = validateCookie({ cookie: context, key: "notebook" });
  const notebookId = parsedNotebook.id;

  // If no notebook is selected, redirect the user to select one.
  if (!notebookId) {
    return {
      redirect: {
        permanent: false,
        destination: "/view-notebooks",
      },
      props: {},
    };
  }

  const client = AuthenticationClient.init({
    ...AUTH_CONFIG,
    resource: `onenote/notebooks/${notebookId}/sections`,
  });
  const request = await client.api({ context });
  const response = await request.executeRequest({
    shouldReturnProps: true,
  });

  if (response.value) return response.value;

  return response;
}

export default ViewSections;
