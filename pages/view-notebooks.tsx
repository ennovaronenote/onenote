import { NextPageContext } from "next";
import { AuthenticationClient } from "../lib/AuthenticationClient";
import { AUTH_CONFIG } from "../lib/Constants";
import ErrorMessage from "../components/Error/Message";
import ResourceMain from "../components/Resource/Main";
import PageTitle from "../components/PageTitle";

/**
 * Page to render list of notebooks
 * @group Pages
 * @returns
 */
function ViewNotebooks(props: any) {
  if (props.error) return <ErrorMessage error={props.error} />;
  if (!props.value)
    return <p className="text-center">Loading your notebooks, please wait.</p>;

  // Returned JSX
  return (
    <div className="container mx-auto">
      <PageTitle title={"My Notebooks"} />

      <ResourceMain
        resource={props.value}
        cookieKey="notebook"
        tableCookieKey="notebook"
        headers={["Notebook Name", "OneNote Link", "Creation Date"]}
      />
    </div>
  );
}

/** @ignore */
export async function getServerSideProps(context: NextPageContext) {
  const client = AuthenticationClient.init({
    ...AUTH_CONFIG,
    resource: "onenote/notebooks",
  });
  const request = await client.api({ context });
  const response = await request.executeRequest({
    shouldReturnProps: true,
  });

  return response;
}

export default ViewNotebooks;
