import { gql } from "graphql-tag";
import { User } from "types";
import { UserDetailFields } from "./fragments/UserFields";

export type QueryData = {
  user: User;
};

export type QueryVars = {
  user_id: string;
};

export const Query = gql`
  query UserQuery($user_id: String) {
    user(user_id: $user_id) {
      ...UserDetailFields
    }
  }
  ${UserDetailFields}
`;
