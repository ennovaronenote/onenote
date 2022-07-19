import { NextPageContext } from "next";
import { parse } from "node-html-parser";
import TemplateForm from "../components/Template/Form";
import { AuthenticationClient } from "../lib/AuthenticationClient";
import { AUTH_CONFIG } from "../lib/Constants";

/**
 * @group Pages
 */
function CreateTemplate(props: any) {
  return (
    <div className="container mx-auto">
      <TemplateForm selectedPage={props.html} title={props.title} />
    </div>
  );
}
export default CreateTemplate;

export async function getServerSideProps(context: any) {
  try {
    const page = JSON.parse(context.req.cookies.page);
    const client = AuthenticationClient.init(AUTH_CONFIG);
    const request = await client.api({
      context,
      resource: `onenote/pages/${page.id}/content?includeIDs=true`,
    });

    const response = await request.executeRequest({
      shouldReturnProps: true,
      contentType: "text/html",
      shouldReturnHtml: true,
    });

    const parsed = parse(response.props.htmlContent).removeWhitespace();
    const output = parsed.outerHTML;
    const title = parsed.querySelector("title")?.textContent || "";

    return {
      props: {
        html: output.toString(),
        title,
      },
    };
  } catch (e) {
    console.log(e);
    const error = {
      error: true,
      message: "Invalid parse of cookie",
      rawError: JSON.stringify(e),
    };
    return {
      props: error,
    };
  }
}
