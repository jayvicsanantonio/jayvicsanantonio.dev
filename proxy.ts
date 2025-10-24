import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { userAgent } from "next/server";

export function proxy(req: NextRequest) {
  // Only handle the homepage
  if (req.nextUrl.pathname !== "/") return NextResponse.next();

  const ua = userAgent(req);

  // Skip bots and non-mobile devices
  if (ua.isBot) return NextResponse.next();

  const isMobile = ua.device.type === "mobile" || ua.device.type === "tablet";
  const isSafari = ua.browser.name === "Safari";

  if (isMobile || isSafari) {
    const url = req.nextUrl.clone();
    url.pathname = "/lite";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
