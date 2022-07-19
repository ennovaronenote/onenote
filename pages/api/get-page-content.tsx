import { NextApiRequest, NextApiResponse } from "next";
import { AuthenticationClient } from "../../lib/AuthenticationClient";
import { AUTH_CONFIG } from "../../lib/Constants";
import { parse } from "node-html-parser";
import { parseOneNoteResponse } from "../../lib/parsing";

export default async function getPageContent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") return res.status(200).json({});

  const client = AuthenticationClient.init(AUTH_CONFIG);
  const page: any = { id: undefined };

  try {
    const parsedCookies = req.cookies;
    const parsedPage = JSON.parse(parsedCookies.page || "");
    page.id = parsedPage.id || undefined;
  } catch (e) {
    console.error(e);
  }

  const requestConfig = {
    context: { req, res },
    resource: `onenote/pages/${page.id}/content?includeIDs=true`,
  };

  const executeRequestConfig = {
    method: "GET",
    contentType: "text/html",
  };

  const request = await client.api(requestConfig);
  //const pageContent = await request.executeRequest(executeRequestConfig);
  //const parsedPageContent = parseOneNoteResponse(pageContent.props.htmlContent);

  //console.log(parsedPageContent);

  if (page.id) {
    const html = parse(req.body.html);
    executeRequestConfig["method"] = "PATCH";
    executeRequestConfig["contentType"] = "application/json";

    const table = html.querySelector(`[data-id="trainingTable"]`);
    //const parsie = parseOneNoteResponse(html);
  }

  // const response = await request.executeRequest({
  //   body: req.body,
  //   method: "POST",
  //   contentType: "text/html",
  // });
  res.status(200).json({});
}
