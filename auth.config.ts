import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  providers: [],
  callbacks: {
    authorized({ request, auth }: any) {
      //Array of regex patterns of paths that require authentication
      const protectedPaths = [
        /\/shipping-address/,
        /\/payment-method/,
        /\/place-order/,
        /\/profile/,
        /\/user\/(.*)/,
        /\/order\/(.*)/,
        /\/admin\/(.*)/,
      ];

      const { pathname } = request.nextUrl;
      //Check if user is not authenticated and accessing a protected path
      if (!auth?.user && protectedPaths.some((path) => path.test(pathname)))
        return false;

      //check for session cart cookie
      if (!request.cookies.get("sessionCartId")) {
        //Generate new session cart cookie
        const sessionCartId = crypto.randomUUID();
        //Clone the request headers
        const newRequestHeaders = new Headers(request.headers);
        //Create new response and add the new headers
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });
        //Set the session cart cookie
        response.cookies.set("sessionCartId", sessionCartId);
        return response;
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;
