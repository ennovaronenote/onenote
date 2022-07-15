import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "node-html-parser";
import { AuthenticationClient } from "../../lib/AuthenticationClient";
import { AUTH_CONFIG } from "../../lib/Constants";

export default async function sendToOneNote(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") return res.status(400).json({});
  const body = JSON.parse(req.body);
  if (!body.table) return res.status(400).json({});

  const parsed = parse(body.table);
  if (!parsed) return res.status(400).json({});

  const client = AuthenticationClient.init(AUTH_CONFIG);
  const request = await client.api(req);
  res.status(200).json({});
}
