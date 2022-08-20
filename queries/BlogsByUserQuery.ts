import { gql } from "graphql-tag";
import { Blog } from "types";
import { BlogsListItemFields } from "./fragments/BlogFields";

export type QueryData = {
  blogsByUser: Blog[];
};

export type QueryVars = {
  user_id: string;
};

export const Query = gql`
  query BlogsQuery($user_id: String) {
    blogsByUser(user_id: $user_id) {
      ...BlogsListItemFields
    }
  }
  ${BlogsListItemFields}
`;
