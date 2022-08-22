import { gql } from "graphql-tag";
import { User } from "types";

export type MutationData = {
  user: User;
};

export type MutationVars = {
  user_id: string;
};

export const Mutation = gql`
  mutation BecomeAdminMutation($user_id: String!) {
    becomeAdmin(user_id: $user_id) {
      id
      name
      role
    }
  }
`;
