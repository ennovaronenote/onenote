import { setCookie } from "cookies-next";
import { NextPage, NextPageContext } from "next";
import PageTitle from "../components/PageTitle";
import { AuthenticationClient } from "../lib/AuthenticationClient";
import { AUTH_CONFIG } from "../lib/Constants";

/**
 * Page to render the home / landing page.
 * @group Pages
 */
const Home: NextPage = () => {
  return (
    <div className="container mx-auto">
      <PageTitle title="Home Page" />
    </div>
  );
};

/** @ignore */
export async function getServerSideProps(context: NextPageContext) {
  const client = AuthenticationClient.init(AUTH_CONFIG);
  const request = await client.api({ context });
  const response = await request.executeRequest({});

  console.log(response);
  return { props: {} };
}

export default Home;
