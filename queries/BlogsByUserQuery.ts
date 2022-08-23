import { gql } from "graphql-tag";
import { Blog, User } from "types";
import { BlogsListItemFields } from "./fragments/BlogFields";
import { UserListItemFields } from "./fragments/UserFields";

export type QueryData = {
  blogsByUser: Blog[];
  user: User;
};

export type QueryVars = {
  user_id: string;
};

export const Query = gql`
  query BlogsQuery($user_id: String) {
    blogsByUser(user_id: $user_id) {
      ...BlogsListItemFields
    }
    user(user_id: $user_id) {
      ...UserListItemFields
    }
  }
  ${BlogsListItemFields}
  ${UserListItemFields}
`;
