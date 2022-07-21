import { setCookie } from "cookies-next";
import { AuthenticationClient } from "./AuthenticationClient";
import { AUTH_CONFIG } from "./Constants";
import validateCookie from "./validateCookie";

export default async function getSections(
  context: any,
  notebookIdOverride?: string
) {
  const parsedNotebook = validateCookie({ cookie: context, key: "notebook" });
  const notebookId = notebookIdOverride || parsedNotebook.id;

  const client = AuthenticationClient.init({
    ...AUTH_CONFIG,
    resource: `onenote/notebooks/${notebookId}/sections`,
  });
  const request = await client.api({ context });
  const response = await request.executeRequest({
    shouldReturnProps: true,
  });

  const sections: any = [];
  if (response.props.value) {
    response.props.value.map((section: any) => {
      sections.push({
        id: section.id,
        displayName: section.displayName,
      });
    });
  }

  setCookie("sections", JSON.stringify(sections), {
    req: context.req,
    res: context.res,
    sameSite: "lax",
    path: "/",
  });

  return response;
}
