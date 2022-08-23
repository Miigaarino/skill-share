import gql from "graphql-tag";

import { BlogsListItemFields } from "./BlogFields";

export const UserListItemFields = gql`
  fragment UserListItemFields on User {
    id
    name
    image
    email
    createdAt
  }
`;

export const UserDetailFields = gql`
  fragment UserDetailFields on User {
    ...UserListItemFields
    reputation_point
    role
    approvedPosts {
      ...BlogsListItemFields
      status
      author {
        id
        name
        image
      }
    }
    posts {
      ...BlogsListItemFields
      status
      approvedBy {
        id
        name
      }
    }
    comments {
      id
      content
      createdAt
      blog {
        id
        title
        author {
          id
          name
        }
      }
    }
    likedPosts {
      createdAt
      blog {
        id
        title
        author {
          id
          name
        }
      }
    }
  }
  ${UserListItemFields}
  ${BlogsListItemFields}
`;
