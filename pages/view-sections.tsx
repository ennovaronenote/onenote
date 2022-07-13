import { NextPageContext } from "next";
import { AuthenticationClient } from "../lib/AuthenticationClient";
import { AUTH_CONFIG } from "../lib/Constants";
import { parse } from "cookie";
import SectionMain from "../components/Section/Main";
import ErrorMessage from "../components/Error/Message";
import useCookies from "../hooks/useCookies";

/**
 * Page to view list of sections. This page needs a notebook ID to make a graph request, so it validates the selected notebook via cookies.
 * @see {@link ViewNotebooks}
 * @group Pages
 * @returns
 */
function ViewSections(props: any) {
  const { getCookieByKey } = useCookies("section");

  if (props["error"]) return <ErrorMessage error={props.error} />;
  if (!props.value)
    return <p className="text-center">Loading your sections, please wait.</p>;

  if (!getCookieByKey("notebook")["id"])
    return (
      <ErrorMessage
        error={{ code: "BadNotebook", message: "Notebook not detected." }}
      />
    );

  return (
    <SectionMain
      sections={props.value}
      notebookTitle={getCookieByKey("notebook")["displayName"]}
    />
  );
}

/** @ignore */
export async function getServerSideProps(context: NextPageContext) {
  const cookies = parse(context.req?.headers?.cookie || "");
  const amountOfCookies = Object.keys(cookies).length;

  // Prevent Graph requests if no selected notebook was found in cookies
  if (amountOfCookies !== 0 && !cookies["notebook"]) {
    return {
      props: {
        error: {
          code: "BadNotebook",
          message:
            "The notebook either was not selected or was incorrectly detected!",
        },
      },
    };
  }

  const parsedNotebook = JSON.parse(cookies["notebook"]);
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
