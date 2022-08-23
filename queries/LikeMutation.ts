import { gql } from "graphql-tag";

import { LikedPosts } from "types";

export type MutationData = {
  like: LikedPosts;
};

export type MutationVars = {
  blog_id: string;
};

export const Mutation = gql`
  mutation LikeMutation($blog_id: String!) {
    like(blog_id: $blog_id) {
      createdAt
      user {
        name
      }
    }
  }
`;
