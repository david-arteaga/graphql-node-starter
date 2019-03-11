import { AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server';
import { GraphQLField } from 'graphql';
import { Users } from '../../model/models/Users';

export const getAuthDirectiveVisitor = () =>
  class AuthDirectiveVisitor extends SchemaDirectiveVisitor {
    visitFieldDefinition(
      field: GraphQLField<any, any>,
    ): GraphQLField<any, any> | void {
      const previousResolve = field.resolve;

      field.resolve = async (root, params, context, info) => {
        const user = context.req.user as Users.Type;
        if (!user) {
          throw new AuthenticationError('Invalid authentication');
        }

        return previousResolve
          ? previousResolve(root, params, context, info)
          : root[field.name];
      };

      return field;
    }
  };
