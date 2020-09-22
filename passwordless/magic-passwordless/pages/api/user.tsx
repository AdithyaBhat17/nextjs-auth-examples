import { NextApiRequest, NextApiResponse } from "next";
import { decryptSession } from "../../lib/iron";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  const session = await decryptSession(req);
  // TODO: send user data from DB instead of sending session.
  res.status(200).json({ user: session || null });
}
