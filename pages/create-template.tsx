import { parse } from "node-html-parser";
import { AuthenticationClient } from "../lib/AuthenticationClient";
import { AUTH_CONFIG } from "../lib/Constants";
import TemplateForm from "../components/Template/Form";
import validateCookie from "../lib/validateCookie";

/**
 * @group Pages
 */
export default function CreateTemplate(props: any) {
  return (
    <div className="container mx-auto">
      <TemplateForm selectedPage={props.html} title={props.title} />
    </div>
  );
}

/**
 * @ignore
 */
export async function getServerSideProps(context: any) {
  // If there's not a valid cookie, the app will refuse to make an unnecessary Graph request.
  // Instead, it will allow the user to create a template that will be appended to their selected section

  const parsedPage = validateCookie({ cookie: context, key: "page" });
  if (!parsedPage.id) {
    return {
      props: {
        error: true,
        html: "",
        title: "",
      },
    };
  }
  const client = AuthenticationClient.init(AUTH_CONFIG);
  const request = await client.api({
    context,
    resource: `onenote/pages/${parsedPage.id}/content?includeIDs=true`,
  });

  // Retrieve + parse HTML content from OneNote
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
}
