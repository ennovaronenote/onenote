import { NextApiRequest, NextApiResponse } from "next";
import { AuthenticationClient } from "../../lib/AuthenticationClient";
import { AUTH_CONFIG } from "../../lib/Constants";
import { parse } from "node-html-parser";

export default async function createPage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") res.status(400).json({});

  const client = AuthenticationClient.init(AUTH_CONFIG);
  const request = await client.api({
    context: {
      req,
      res,
    },
    resource: "onenote/sections/1-942cea58-0754-4e0a-bbc9-7c62f66a6b56/pages",
  });

  const response = await request.executeRequest({
    body: req.body,
    method: "POST",
    contentType: "text/html",
  });
  res.status(200).json({});
}
