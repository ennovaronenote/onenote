import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequest, NextApiResponse } from "next";

interface IClientOptions {
  baseUrl?: string;
  userSelector?: string;
  resource?: string;
  req: NextApiRequest | IncomingMessage | undefined;
  res: NextApiResponse | ServerResponse | undefined;
}

export type { IClientOptions };
