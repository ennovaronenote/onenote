import { NextPage } from "next";
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

const client = AuthenticationClient.init(AUTH_CONFIG);
client.api();

export default Home;
