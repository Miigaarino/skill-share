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

export const BlogDetailFields = gql`
  fragment BlogDetailFields on Blog {
    ...BlogsListItemFields
    content
    status
    author {
      id
      name
      image
      email
    }
  }
  ${BlogsListItemFields}
`;
