// @ts-nocheck - may need to be at the start of file
import {
  asNexusMethod,
  enumType,
  extendType,
  nonNull,
  objectType,
  stringArg,
} from "nexus";

import { DateTimeResolver } from "graphql-scalars";

import { Comment } from "./Comment";
import { LikedPosts } from "./Like";
import { User } from "./User";

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
    t.field("approvedBy", {
      type: User,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.blog
          .findUnique({
            where: {
              id: parent.id as string,
            },
          })
          .approvedBy();
      },
    });
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
    t.list.field("likedBy", {
      type: LikedPosts,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.likedPosts.findMany({
          orderBy: { createdAt: "desc" },
          where: {
            blogId: parent.id as string,
          },
        });
      },
    });
    t.list.field("comments", {
      type: Comment,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.comment.findMany({
          orderBy: { createdAt: "desc" },
          where: {
            blogId: parent.id as string,
          },
        });
      },
    });
  },
});

export const PublishedBlogsQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("publishedBlogs", {
      type: "Blog",
      resolve(_, __, ctx) {
        return ctx.prisma.blog.findMany({
          where: { status: "PUBLISHED" },
        });
      },
    });
  },
});

export const AllBlogsQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("allBlogs", {
      type: "Blog",
      resolve(_, __, ctx) {
        if (!ctx.session) {
          throw new Error(`You need to be logged in to perform an action`);
        }

        if (ctx?.session?.user?.role !== "ADMIN") {
          throw new Error(`Only admin can see all the blogs`);
        }

        return ctx.prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
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
        if (ctx.session?.user?.role === "ADMIN") {
          return await ctx.prisma.blog.findFirstOrThrow({
            where: {
              id: args.blog_id as string,
            },
          });
        }

        if (ctx.session?.user?.id) {
          return await ctx.prisma.blog.findFirstOrThrow({
            where: {
              id: args.blog_id as string,
              authorId: ctx.session?.user?.id,
            },
          });
        }

        return await ctx.prisma.blog.findFirstOrThrow({
          where: { id: args.blog_id as string, status: "PUBLISHED" },
        });
      },
    });
  },
});

export const CreateBlogMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createBlog", {
      type: Blog,
      args: {
        title: nonNull(stringArg()),
        banner: nonNull(stringArg()),
        content: nonNull(stringArg()),
        author_id: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.session) {
          throw new Error(`You need to be logged in to perform an action`);
        }

        return await ctx.prisma.blog.create({
          data: {
            banner: args.banner,
            content: args.content,
            title: args.title,
            authorId: args.author_id,
          },
        });
      },
    });
  },
});

export const UpdateBlogMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateBlog", {
      type: Blog,
      args: {
        title: stringArg(),
        banner: stringArg(),
        content: stringArg(),
        blog_id: nonNull(stringArg()),
        author_id: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.session) {
          throw new Error(`You need to be logged in to perform an action`);
        }

        if (ctx?.session?.user?.id !== args.author_id) {
          throw new Error(`Only the author who wrote the blog can edit it`);
        }

        return await ctx.prisma.blog.update({
          where: {
            id: args.blog_id,
          },
          data: {
            banner: args.banner as string,
            content: args.content as string,
            title: args.title as string,
          },
        });
      },
    });
  },
});

export const ReviewBlogMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("reviewBlog", {
      type: Blog,
      args: {
        blog_id: nonNull(stringArg()),
        status: nonNull(status),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.session) {
          throw new Error(`You need to be logged in to perform an action`);
        }

        if (ctx?.session?.user?.role !== "ADMIN") {
          throw new Error(`Only admin can review posts`);
        }

        return await ctx.prisma.blog.update({
          where: {
            id: args.blog_id,
          },
          data: {
            status: args.status,
            approvedById: ctx?.session?.user.id,
          },
        });
      },
    });
  },
});

const status = enumType({
  name: "PostStatus",
  members: ["DRAFT", "PUBLISHED", "REJECTED"],
});
