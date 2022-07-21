import { NextApiRequest, NextApiResponse } from "next";
import { AuthenticationClient } from "../../lib/AuthenticationClient";
import { AUTH_CONFIG } from "../../lib/Constants";
import { parse } from "node-html-parser";
import { parseOneNoteResponse } from "../../lib/parsing";

export default async function getAllPages(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = AuthenticationClient.init(AUTH_CONFIG);
  const userSelector = req.query.userSelector;
  const requestConfig: any = {
    context: { req, res },
    userSelector: userSelector || undefined,
    resource: req.query.resource || `onenote/sections`,
  };

  const executeRequestConfig = {
    method: "GET",
    contentType: "application/json",
  };

  const request = await client.api(requestConfig);
  const response = await request.executeRequest(executeRequestConfig);

  if (!response) return res.status(400).json({});

  if (response.value) {
    const foundTrainingList = response.value.find((section: any) => {
      return section.displayName === "Training List";
    });

    return res.status(200).json(foundTrainingList || response.value);
  }
  res.status(200).json(response);
}
