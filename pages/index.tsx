import { setCookie } from "cookies-next";
import { NextPage, NextPageContext } from "next";
import { AuthenticationClient } from "../lib/AuthenticationClient";
import { AUTH_CONFIG } from "../lib/Constants";

/**
 * Page to render the home / landing page.
 * @group Pages
 */
const Home: NextPage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-center">Home Page</h1>
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const client = AuthenticationClient.init(AUTH_CONFIG);
  const request = await client.api(context);

  request.executeRequest();
  return { props: {} };
}

export default Home;
