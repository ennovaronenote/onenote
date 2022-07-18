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
      <h1 className="prose-2xl text-neutral-700 mx-auto text-center py-5">
        Home Page
      </h1>
    </div>
  );
};

/** @ignore */
export async function getServerSideProps(context: NextPageContext) {
  const client = AuthenticationClient.init(AUTH_CONFIG);
  const request = await client.api({ context });

  request.executeRequest({});
  return { props: {} };
}

export default Home;
