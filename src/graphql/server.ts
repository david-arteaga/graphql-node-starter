import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import GraphQLJSON from 'graphql-type-json';
import { getAuthDirectiveVisitor } from './directives/auth';
import authOperations from './operations/auth/auth';
import recursive_merge from './recursive_merge';
import { DateResolver } from './scalars/date';
import sharedSchema from './shared-schema';
import { GraphqlError, GraphqlResolver } from './util/GraphqlTypes';

const ConstraintDirective = require('graphql-constraint-directive');

const rootQuery = gql`
  scalar JSON

  scalar Date

  directive @auth on QUERY | MUTATION | FIELD_DEFINITION

  directive @constraint(
    # String constraints
    minLength: Int
    maxLength: Int
    startsWith: String
    endsWith: String
    notContains: String
    pattern: String
    format: String

    # Number constraints
    min: Int
    max: Int
    exclusiveMin: Int
    exclusiveMax: Int
    multipleOf: Int
  ) on INPUT_FIELD_DEFINITION

  scalar ConstraintString

  scalar ConstraintNumber

  type Query {
    hi: String
  }

  type Mutation {
    hi: String
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

const rootResolver: GraphqlResolver = {
  Query: {
    hi: () => 'Hi',
  },
  Mutation: {
    hi: () => 'Hi',
  },
};

const scalarResolvers: GraphqlResolver = {
  Date: DateResolver,
  JSON: GraphQLJSON,
};

const formatError = (error: GraphqlError) => {
  console.error('Error from graphql resolvers');
  console.error(error);
  console.error(error.originalError);
  const { message, path, extensions } = error as any;
  return {
    message,
    path,
    extensions: { code: (extensions || {}).code },
  };
};

const context = ({ req }: { req: express.Request }) => ({ req });

const merged_resolvers = recursive_merge([
  rootResolver,
  scalarResolvers,
  ...authOperations.resolvers,
]);

const typeDefs = [rootQuery, sharedSchema, ...authOperations.schema];

export const server = new ApolloServer({
  typeDefs,
  resolvers: merged_resolvers,
  formatError,
  context,
  tracing: true,
  cacheControl: true,
  schemaDirectives: {
    auth: getAuthDirectiveVisitor(),
    constraint: ConstraintDirective,
  },
  uploads: true,
  // mocks: {
  // }
});
