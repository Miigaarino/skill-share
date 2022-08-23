// @ts-nocheck - may need to be at the start of file
import { extendType, nonNull, objectType, stringArg } from "nexus";
import { Blog } from "./Blog";
import { User } from "./User";

export const Comment = objectType({
  name: "Comment",
  definition(t) {
    t.string("id");
    t.string("content");
    t.string("createdAt");
    t.field("blog", {
      type: Blog,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.blog.findFirst({
          where: {
            comments: {
              some: {
                id: parent.id as string,
              },
            },
          },
        });
      },
    });
    t.field("author", {
      type: User,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.user.findFirst({
          where: {
            comments: {
              some: {
                id: parent.id as string,
              },
            },
          },
        });
      },
    });
  },
});

export const AllComments = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("allComments", {
      type: "Comment",
      resolve(_, __, ctx) {
        return ctx.prisma.comment.findMany({
          orderBy: {
            createdAt: "desc",
          },
        });
      },
    });
  },
});

export const AddCommentMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("addComment", {
      type: Blog,
      args: {
        content: nonNull(stringArg()),
        blog_id: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.session) {
          throw new Error(`You need to be logged in to perform an action`);
        }

        return await ctx.prisma.comment.create({
          data: {
            content: args.content,
            blogId: args.blog_id,
            authorId: ctx.session.user.id,
          },
        });
      },
    });
  },
});
