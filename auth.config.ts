import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  providers: [],
  callbacks: {
    authorized({ request, auth }: any) {
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
