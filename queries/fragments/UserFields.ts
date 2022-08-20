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
    posts {
      ...BlogsListItemFields
      status
    }
  }
  ${UserListItemFields}
  ${BlogsListItemFields}
`;
