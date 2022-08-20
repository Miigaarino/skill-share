import { enumType, extendType, objectType, stringArg } from "nexus";
import { Blog } from "./Blog";

export const User = objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("email");
    t.string("image");
    t.string("createdAt");
    t.string("updatedAt");
    t.field("role", { type: role });
    t.int("reputation_point");
    t.list.field("posts", {
      type: Blog,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: parent.id as string,
            },
          })
          .posts();
      },
    });
  },
});

export const UsersQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("users", {
      type: "User",
      resolve(_, __, ctx) {
        return ctx.prisma.user.findMany();
      },
    });
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("user", {
      type: "User",
      args: {
        user_id: stringArg(),
      },
      async resolve(_, args, ctx) {
        return await ctx.prisma.user.findUnique({
          where: { id: args.user_id },
        });
      },
    });
  },
});

const role = enumType({
  name: "Role",
  members: ["BASIC", "ADMIN"],
});
