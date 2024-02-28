import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const cokie = req.cookies.get("connect.sid");
  const isAuth = cokie?.value ? true : false;
  const path = req.nextUrl.pathname;

  const protectedRoutes = ["/profile"];

  if (path.startsWith("/_next")) {
    return NextResponse.next();
  }

  const Your_URL = "http://localhost:3000";
  if (protectedRoutes.includes(path) && !isAuth) {
    const httpsRedirectUrl = `${Your_URL}/login`;
    return NextResponse.redirect(httpsRedirectUrl);
  }

  return NextResponse.next();
}
