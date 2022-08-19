import { enumType, extendType, objectType } from "nexus";
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

const status = enumType({
  name: "Status",
  members: ["DRAFT", "PUBLISHED"],
});
