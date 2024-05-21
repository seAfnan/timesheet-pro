export { default } from "next-auth/middleware";
import withAuth from "next-auth/middleware";
// import { NextResponse } from 'next/server';

withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req: any) {
    console.log("going through middleware", req.nextauth.token);
    // if (
    //   req.nextUrl.pathname == '/admin' &&
    //   req.nextUrl?.token?.role !== 'admin'
    // )
    //   return NextResponse.rewrite(new URL('/dashboard', req.url));
  },

  {
    callbacks: {
      // authorized: ({ token }) => !!token,
    },

    pages: {
      signIn: "/login",
      // error: "/api/auth/error",
    },
  }
);

export const config = {
  matcher: ["/:path*"],
};
