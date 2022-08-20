import { enumType, extendType, objectType, stringArg } from "nexus";
import { User } from "./User";

import { asNexusMethod } from "nexus";
import { DateTimeResolver } from "graphql-scalars";

export const GQLDate = asNexusMethod(DateTimeResolver, "date");

export const Blog = objectType({
  name: "Blog",
  definition(t) {
    t.string("id");
    t.string("createdAt");
    t.string("updatedAt");
    t.string("title");
    t.field("status", { type: status });
    t.int("likes");
    t.string("content");
    t.string("banner");
    t.field("author", {
      type: User,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.blog
          .findUnique({
            where: {
              id: parent.id as string,
            },
          })
          .author();
      },
    });
  },
});

export const BlogsQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("blogs", {
      type: "Blog",
      resolve(_, __, ctx) {
        return ctx.prisma.blog.findMany({ where: { status: "PUBLISHED" } });
      },
    });
  },
});

export const BlogsByUserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("blogsByUser", {
      type: "Blog",
      args: {
        user_id: stringArg(),
      },
      async resolve(_, args, ctx) {
        return await ctx.prisma.blog.findMany({
          where: {
            authorId: args.user_id as string,
            status: "PUBLISHED",
          },
        });
      },
    });
  },
});

export const BlogQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("blog", {
      type: "Blog",
      args: {
        blog_id: stringArg(),
      },
      async resolve(_, args, ctx) {
        return await ctx.prisma.blog.findFirstOrThrow({
          where: { id: args.blog_id as string, status: "PUBLISHED" },
        });
      },
    });
  },
});

const status = enumType({
  name: "Status",
  members: ["DRAFT", "PUBLISHED"],
});
