// İstemci Tarafında Çerez Alma Fonksiyonu
export const getCookiesFromClient = (): Record<string, string> => {
  const cookies: Record<string, string> = {};
  if (typeof document !== "undefined") {
    document.cookie.split(";").forEach((cookie) => {
      const [key, value] = cookie.trim().split("=");
      cookies[key] = decodeURIComponent(value);
    });
  }
  return cookies;
};
