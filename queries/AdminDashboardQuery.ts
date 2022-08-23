import { gql } from "graphql-tag";
import { Blog, Comment, User } from "types";
import { BlogsListItemFields } from "./fragments/BlogFields";
import { UserListItemFields } from "./fragments/UserFields";

export type QueryData = {
  allBlogs: Blog[];
  users: User[];
  allComments: Comment[];
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
      approvedBy {
        id
        name
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
    allComments {
      id
      content
      createdAt
      blog {
        id
        title
      }
      author {
        id
        name
        email
      }
    }
  }
  ${BlogsListItemFields}
  ${UserListItemFields}
`;
