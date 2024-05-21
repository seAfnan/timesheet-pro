import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: number;
      email: string;
      name: string;
    };
    backendToken: { accessKey: string; expiresIn: number };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      _id: number;
      email: string;
      name: string;
    };
    backendToken: { accessKey: string; expiresIn: number };
  }
}
