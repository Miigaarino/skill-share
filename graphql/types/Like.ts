// @ts-nocheck - may need to be at the start of file
import { extendType, nonNull, objectType, stringArg } from "nexus";
import { Blog } from "./Blog";
import { User } from "./User";

export const LikedPosts = objectType({
  name: "LikedPosts",
  definition(t) {
    t.string("createdAt");
    t.field("blog", {
      type: Blog,
      async resolve(parent, args, ctx) {
        return await ctx.prisma.blog.findUnique({
          where: {
            id: parent.blogId as string,
          },
        });
      },
    });
    t.field("user", {
      type: User,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.user.findUnique({
          where: {
            id: parent.userId as string,
          },
        });
      },
    });
  },
});

export const LikeMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("like", {
      type: LikedPosts,
      args: {
        blog_id: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.session) {
          throw new Error(`You need to be logged in to perform an action`);
        }

        const isLikedAlready = await ctx.prisma.likedPosts.findFirst({
          where: {
            blogId: args.blog_id,
            userId: ctx.session.user.id,
          },
        });

        if (isLikedAlready) {
          throw new Error(`Already liked!`);
        }

        const blog = await ctx.prisma.blog.findUnique({
          where: {
            id: args.blog_id,
          },
          select: {
            authorId: true,
          },
        });

        await Promise.all([
          ctx.prisma.blog.update({
            where: { id: args.blog_id },
            data: {
              likes: {
                increment: 1,
              },
            },
          }),
          ctx.prisma.user.update({
            where: { id: blog?.authorId },
            data: {
              reputation_point: {
                increment: 1,
              },
            },
          }),
        ]);

        return await ctx.prisma.likedPosts.create({
          data: {
            blogId: args.blog_id,
            userId: ctx.session.user.id,
          },
        });
      },
    });
  },
});
