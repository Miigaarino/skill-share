import gql from "graphql-tag";

export const typeDefs = gql`
  type Blog {
    id: String
    createdAt: String
    updatedAt: String
    title: String
    content: String
    banner: String
    published: PostStatus
    likes: Int
  }

  enum PostStatus {
    DRAFT
    PUBLISHED
    DELETED
  }

  type Query {
    blogs: [Blog]!
  }
`;
