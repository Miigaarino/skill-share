import { gql } from "graphql-tag";
import { Blog } from "types";

export type MutationData = {
  createBlog: Blog;
};

export type MutationVars = {
  title: string;
  banner: string;
  content: string;
  author_id: string;
};

export const Mutation = gql`
  mutation CreateBlogMutation(
    $title: String!
    $banner: String!
    $content: String!
    $author_id: String!
  ) {
    createBlog(
      title: $title
      banner: $banner
      content: $content
      author_id: $author_id
    ) {
      id
      title
    }
  }
`;
