import { NextApiRequest } from "next";

// Sunucu Tarafında Çerez Alma Fonksiyonu
export const getCookiesFromServer = (req: NextApiRequest): Record<string, string> => {
  const cookieHeader = req.headers.cookie || "";
  const cookies: Record<string, string> = {};

  cookieHeader.split(";").forEach((cookie) => {
    const [key, value] = cookie.trim().split("=");
    cookies[key] = decodeURIComponent(value);
  });

  return cookies;
};