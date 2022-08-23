import { gql } from "graphql-tag";
import { Blog } from "types";
import { BlogDetailFields } from "./fragments/BlogFields";
import { UserListItemFields } from "./fragments/UserFields";

export type QueryData = {
  blog: Blog;
};

export type QueryVars = {
  blog_id: string;
};

export const Query = gql`
  query BlogsQuery($blog_id: String) {
    blog(blog_id: $blog_id) {
      ...BlogDetailFields
      comments {
        id
        content
        createdAt
        author {
          ...UserListItemFields
        }
      }
      likedBy {
        user {
          ...UserListItemFields
        }
        createdAt
      }
    }
  }
  ${BlogDetailFields}
  ${UserListItemFields}
`;
