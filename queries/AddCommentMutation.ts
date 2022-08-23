import { gql } from "graphql-tag";
import { Comment } from "types";

export type MutationData = {
  addComment: Comment;
};

export type MutationVars = {
  blog_id: string;
  content: string;
};

export const Mutation = gql`
  mutation AddCommentMutation($blog_id: String!, $content: String!) {
    addComment(blog_id: $blog_id, content: $content) {
      id
      content
    }
  }
`;
