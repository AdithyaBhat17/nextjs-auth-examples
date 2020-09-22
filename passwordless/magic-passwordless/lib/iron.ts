import Iron from "@hapi/iron";
import { getTokenCookie } from "./auth-session";

const IRON_SECRET = process.env.iron_key;

export function encryptSession(session) {
  return Iron.seal(session, IRON_SECRET, Iron.defaults);
}

export async function decryptSession(req) {
  const token = getTokenCookie(req);
  return token && Iron.unseal(token, IRON_SECRET, Iron.defaults);
}
