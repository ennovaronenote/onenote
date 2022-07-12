import { NextPageContext } from "next";
import SectionMain from "../components/Section/Main";
import { AuthenticationClient } from "../lib/AuthenticationClient";
import { AUTH_CONFIG } from "../lib/Constants";
import { parse } from "cookie";
import ErrorMessage from "../components/Error/Message";

/**
 * Page to view list of sections. This page needs a notebook ID to make a graph request, so it validates the selected notebook via cookies.
 * @see {@link ViewNotebooks}
 * @group Pages
 * @returns
 */
function ViewSections(props: any) {
  if (props["error"]) return <ErrorMessage error={props.error} />;
  return <SectionMain />;
}

/** @ignore */
export async function getServerSideProps(context: NextPageContext) {
  const cookies = parse(context.req?.headers?.cookie || "");
  const amountOfCookies = Object.keys(cookies).length;

  // Prevent Graph requests if no selected notebook was found in cookies
  if (!cookies["selectedNotebook"]) {
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

  const client = AuthenticationClient.init({
    ...AUTH_CONFIG,
    resource: "",
  });
  const request = await client.api(context);
  const response = await request.executeRequest();

  return {
    props: {},
  };
}

export default ViewSections;
