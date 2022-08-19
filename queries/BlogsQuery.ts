import { gql } from "graphql-tag";
import { Blog } from "types";
import { BlogsListItemFields } from "./fragments/BlogFields";

export type QueryData = {
  blogs: Pick<Blog, "title" | "banner" | "likes" | "createdAt" | "id">[];
};

export const Query = gql`
  query BlogsQuery {
    blogs {
      ...BlogsListItemFields
    }
  }
  ${BlogsListItemFields}
`;
