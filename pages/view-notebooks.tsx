import { NextPageContext } from "next";
import ErrorMessage from "../components/Error/Message";
import NotebookMain from "../components/Notebook/Main";
import useCookies from "../hooks/useCookies";
import { AuthenticationClient } from "../lib/AuthenticationClient";
import { AUTH_CONFIG } from "../lib/Constants";

/**
 * Page to render list of notebooks
 * @group Pages
 * @returns
 */
function ViewNotebooks(props: any) {
  const { activeCookie } = useCookies("notebook");
  if (props.error) return <ErrorMessage error={props.error} />;
  if (!props.value)
    return <p className="text-center">Loading your notebooks, please wait.</p>;

  const currentSelection = (
    <p className="text-center italic text-sm pb-5">
      Current: {activeCookie.displayName}
    </p>
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-3xl py-5">My Notebooks</h1>
      <p className="text-center italic text-sm pb-1">
        Hint: if you click a row, the app will remember your selection!
      </p>
      {currentSelection}
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
