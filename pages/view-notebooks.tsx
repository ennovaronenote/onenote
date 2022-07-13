import ErrorMessage from "../components/Error/Message";
import NotebookMain from "../components/Notebook/Main";
import { NextPageContext } from "next";
import { AuthenticationClient } from "../lib/AuthenticationClient";
import { AUTH_CONFIG } from "../lib/Constants";

/**
 * Page to render list of notebooks
 * @group Pages
 * @returns
 */
function ViewNotebooks(props: any) {
  if (props.error) return <ErrorMessage error={props.error} />;
  if (!props.value)
    return <p className="text-center">Loading your notebooks, please wait.</p>;

  return (
    <div className="container mx-auto">
      <h1 className="prose-2xl text-neutral-700 mx-auto text-center py-5">
        My Notebooks
      </h1>

      <NotebookMain notebooks={props.value} />
    </div>
  );
}

/** @ignore */
export async function getServerSideProps(context: NextPageContext) {
  const client = AuthenticationClient.init({
    ...AUTH_CONFIG,
    resource: "onenote/notebooks",
  });
  const request = await client.api(context);
  const response = await request.executeRequest(true);

  return response;
}

export default ViewNotebooks;
