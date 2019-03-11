import { gql } from 'apollo-server';

export default gql`
  # For file uploads
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
`;

// The following are other schema entities provided by Apollo
// They are included here so they are present in the auto-generated
// graphql types
gql`
  scalar Upload
`;
