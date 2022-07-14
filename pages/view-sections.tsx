import { NextPageContext } from "next";
import { AuthenticationClient } from "../lib/AuthenticationClient";
import { AUTH_CONFIG } from "../lib/Constants";
import { parse } from "cookie";
import SectionMain from "../components/Section/Main";
import ErrorMessage from "../components/Error/Message";
import useCookies from "../hooks/useCookies";
import validateCookie from "../lib/validateCookie";
import { useEffect, useState } from "react";
import { ErrorType } from "../components/Error/Type";

/**
 * Page to view list of sections. This page needs a notebook ID to make a graph request, so it validates the selected notebook via cookies.
 * @see {@link ViewNotebooks}
 * @group Pages
 * @returns
 */
function ViewSections(props: any) {
  const [foundError, setFoundError] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType<string>>({});
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

    if (props.value) setFoundError(false);
  }, [props, getCookieByKey]);

  return foundError ? (
    <ErrorMessage error={error} />
  ) : (
    <>
      <h1 className="prose-2xl text-neutral-700 mx-auto text-center py-5">
        My Notebooks
      </h1>
      <SectionMain
        sections={props.value}
        notebookTitle={getCookieByKey("notebook")["displayName"]}
      />
    </>
  );
}

/** @ignore */
export async function getServerSideProps(context: NextPageContext) {
  const parsedNotebook = validateCookie({ cookie: context, key: "notebook" });
  const notebookId = parsedNotebook.id;

  const client = AuthenticationClient.init({
    ...AUTH_CONFIG,
    resource: `onenote/notebooks/${notebookId}/sections`,
  });
  const request = await client.api(context);
  const response = await request.executeRequest(true);

  if (response.value) return response.value;
  return response;
}

export default ViewSections;
