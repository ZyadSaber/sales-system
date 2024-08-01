import { type NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export default async function middleware(req: NextRequest) {
  const headerList = headers();

  const auth = headerList.get("token");
  // console.log(auth);

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
