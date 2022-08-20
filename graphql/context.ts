import { PrismaClient } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { options } from "pages/api/auth/[...nextauth]";

import { prismaClient } from "src/prisma";

export type Context = {
  prisma: PrismaClient;
  session?: Session;
};

export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}): Promise<Context> {
  const session = await unstable_getServerSession(req, res, options);

  if (!session)
    return {
      prisma: prismaClient,
    };

  return {
    session,
    prisma: prismaClient,
  };
}
