import { gql } from "graphql-tag";
import { Blog, User } from "types";
import { BlogsListItemFields } from "./fragments/BlogFields";
import { UserListItemFields } from "./fragments/UserFields";

export type QueryData = {
  allBlogs: Blog[];
  users: User[];
};

export const Query = gql`
  query AllBlogsQuery {
    allBlogs {
      ...BlogsListItemFields
      status
      author {
        id
        name
        image
      }
    }
    users {
      ...UserListItemFields
      reputation_point
      posts {
        id
        status
      }
    }
  }
  ${BlogsListItemFields}
  ${UserListItemFields}
`;
