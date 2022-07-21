import { NextApiRequest, NextApiResponse } from "next";
import { AuthenticationClient } from "../../lib/AuthenticationClient";
import { AUTH_CONFIG } from "../../lib/Constants";
import { parse } from "node-html-parser";
import { parseOneNoteResponse } from "../../lib/parsing";

export default async function getPageContent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = AuthenticationClient.init(AUTH_CONFIG);
  const page: any = { id: undefined };

  if (!req.query.pageId) {
    try {
      const parsedCookies = req.cookies;
      const parsedPage = JSON.parse(parsedCookies.page || "");
      page.id = parsedPage.id || undefined;
    } catch (e) {
      console.error(e);
    }
  }

  page.id = req.query.pageId;
  const userSelector = req.query.userSelector;

  const requestConfig: any = {
    context: { req, res },
    userSelector: userSelector || undefined,
    resource: `onenote/pages/${page.id}`,
  };

  const executeRequestConfig = {
    method: "GET",
    contentType: "application/json",
  };

  const request = await client.api(requestConfig);
  const response = await request.executeRequest(executeRequestConfig);

  if (!response) return res.status(400).json({});

  res.status(200).json(response);
}
