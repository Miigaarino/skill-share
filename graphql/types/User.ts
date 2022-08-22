import { enumType, extendType, nonNull, objectType, stringArg } from "nexus";
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
    t.list.field("approvedPosts", {
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
        if (!ctx.session) {
          throw new Error(`You need to be logged in to perform an action`);
        }

        if (ctx?.session?.user?.role !== "ADMIN") {
          throw new Error(`Only admin can see all the users`);
        }

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

export const BecomeAdminMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("becomeAdmin", {
      type: User,
      args: {
        user_id: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.session) {
          throw new Error(`You need to be logged in to perform an action`);
        }

        return await ctx.prisma.user.update({
          where: {
            id: args.user_id,
          },
          data: {
            role: "ADMIN",
          },
        });
      },
    });
  },
});

export const updateProfileMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateProfile", {
      type: User,
      args: {
        user_id: nonNull(stringArg()),
        image: stringArg(),
        name: stringArg(),
        email: stringArg(),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.session) {
          throw new Error(`You need to be logged in to perform an action`);
        }
        if (ctx?.session?.user?.id !== args.user_id) {
          throw new Error(`U can only edit your profile`);
        }

        return await ctx.prisma.user.update({
          where: {
            id: args.user_id,
          },
          data: {
            image: args.image,
            name: args.name,
            email: args.email,
          },
        });
      },
    });
  },
});

const role = enumType({
  name: "Role",
  members: ["BASIC", "ADMIN"],
});
