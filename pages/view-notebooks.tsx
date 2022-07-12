import { NextPageContext } from "next";
import { AuthenticationClient } from "../lib/AuthenticationClient";
import { AUTH_CONFIG } from "../lib/Constants";

function ViewNotebooks(props: any) {
  return (
    <div className="container mx-auto">
      <h1 className="text-center">My Notebooks</h1>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const client = AuthenticationClient.init({
    ...AUTH_CONFIG,
    resource: "onenote/notebooks",
  });
  const request = await client.api(context);

  const response = await request.executeRequest();
  return {
    props: {},
  };
}

export default ViewNotebooks;
