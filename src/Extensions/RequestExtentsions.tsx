import type { IncomingMessage } from "http";

export function getClientIp(req: IncomingMessage): string | null {
  try {
    // x-forwarded-for varsa, ilk IP'yi al
    var forwarded = req.headers["x-forwarded-for"];
    if (typeof forwarded === "string") {
      return forwarded;
    }

    forwarded = req.headers["x-real-ip"];
    if (typeof forwarded === "string") {
      return forwarded;
    }

    forwarded = req.headers["cf-connecting-ip"];
    if (typeof forwarded === "string") {
      return forwarded;
    }

    forwarded = req.headers["true-client-ip"];
    if (typeof forwarded === "string") {
      return forwarded;
    }

    forwarded = req.headers["x-client-ip"];
    if (typeof forwarded === "string") {
      return forwarded;
    }

    forwarded = req.headers["fastly-client-ip"];
    if (typeof forwarded === "string") {
      return forwarded;
    }

    forwarded = req.headers["x-appengine-user-ip"];
    if (typeof forwarded === "string") {
      return forwarded;
    }
    
    if (req.socket?.remoteAddress) {
      return req.socket.remoteAddress;
    }
    return null;
  } catch {
    return null;
  }
}