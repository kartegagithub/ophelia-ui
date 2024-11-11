import { NextApiRequest, NextApiResponse } from "next";

export function removeCookieWithClient(name: string) {
  if (typeof window !== "undefined") {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

export function removeCookieWithServer(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader(
    "Set-Cookie",
    "languageID=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
  );
  res.status(200).json({ message: "Cookie removed" });
}
