import { NextApiRequest, NextApiResponse } from "next";
import auth0 from "../../lib/auth0";

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    await auth0.handleLogin(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message });
  }
}
