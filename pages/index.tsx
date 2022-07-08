import { NextPage } from "next";
import { AuthenticationClient } from "../lib/AuthenticationClient";
import { GRAPH_BASE_URL } from "../lib/Constants";
import { IClientOptions } from "../lib/IClientOptions";

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

const authOptions: IClientOptions = {
  baseUrl: GRAPH_BASE_URL,
};

const client = AuthenticationClient.init(authOptions);

export default Home;
