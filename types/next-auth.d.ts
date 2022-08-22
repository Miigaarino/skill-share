/* eslint-disable no-unused-vars */
import NextAuth, { DefaultSession } from "next-auth";
import { UserRole, UserSession } from "./index";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserSession;
  }
}
