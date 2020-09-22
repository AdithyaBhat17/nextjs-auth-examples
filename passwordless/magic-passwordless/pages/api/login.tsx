import { NextApiRequest, NextApiResponse } from "next";
import { setTokenCookie } from "../../lib/auth-session";
import { encryptSession } from "../../lib/iron";
import { magic } from "../../lib/magic";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const DIDT = req.headers.authorization.split(" ")[1];
    const metadata = await magic.users.getMetadataByToken(DIDT);
    const session = { ...metadata };
    const token = await encryptSession(session);
    setTokenCookie(res, token);
    res.status(200).json({ done: true });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message });
  }
}
