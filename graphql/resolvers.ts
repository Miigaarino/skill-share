export const resolvers = {
  Query: {
    blogs: async (_parent, _args, context) =>
      await context.prisma.blog.findMany({
        where: { published: "PUBLISHED" },
      }),
  },
};
