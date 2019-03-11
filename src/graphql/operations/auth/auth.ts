import { gql } from 'apollo-server';
import { AuthResolvers } from '../../../api/auth/AuthResolvers';
import { getInstanceDI } from '../../../di/di';
import { GraphqlDefaultExport, GraphqlResolver } from '../../util/GraphqlTypes';

const schema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  # Mutation: registerUser
  extend type Mutation {
    registerUser(input: RegisterUserInput!): RegisterUserPayload
  }

  input RegisterUserInput {
    user: RegisterUserInputData!
  }

  input RegisterUserInputData {
    name: String!
    email: String!
    password: String!
  }

  type RegisterUserPayload {
    user: User!
    token: String!
  }

  # Mutation: loginUser
  extend type Mutation {
    loginUser(input: LoginUserInput!): LoginUserPayload
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  type LoginUserPayload {
    user: User!
    token: String!
  }
`;

const resolvers = (auth: AuthResolvers) =>
  <GraphqlResolver>{
    Mutation: {
      registerUser: (_, { input }: { input: GQL.IRegisterUserInput }) =>
        auth.register(input),

      loginUser: (_, { input }: { input: GQL.ILoginUserInput }) =>
        auth.loginUser(input),
    },
  };

export default <GraphqlDefaultExport>{
  schema: [schema],
  resolvers: [resolvers(getInstanceDI(AuthResolvers))],
};
