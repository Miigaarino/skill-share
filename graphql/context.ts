import { PrismaClient } from ".prisma/client";

import { prismaClient } from "src/prisma";

export type Context = {
  prisma: PrismaClient;
};

export async function createContext(req, res): Promise<Context> {
  return {
    prisma: prismaClient,
  };
}
