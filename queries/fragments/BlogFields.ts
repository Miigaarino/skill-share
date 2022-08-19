import gql from "graphql-tag";

export const BlogsListItemFields = gql`
  fragment BlogsListItemFields on Blog {
    id
    title
    createdAt
    likes
    banner
  }
`;
