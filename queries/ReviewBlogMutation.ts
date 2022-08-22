import { PostStatus } from "@prisma/client";
import { gql } from "graphql-tag";
import { Blog } from "types";

export type MutationData = {
  reviewBlog: Blog;
};

export type MutationVars = {
  blog_id: string;
  status: PostStatus;
};

export const Mutation = gql`
  mutation ReviewBlogMutation($blog_id: String!, $status: PostStatus!) {
    reviewBlog(blog_id: $blog_id, status: $status) {
      id
      title
      status
    }
  }
`;
