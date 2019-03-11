import { GraphQLScalarType, Kind } from 'graphql';
export const DateResolver = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue: value => new Date(value),
  serialize: (value: Date) => value.toISOString(),
  parseLiteral: ast => {
    switch (ast.kind) {
      case Kind.STRING: {
        return new Date(ast.value);
      }
      case Kind.INT: {
        return new Date(parseInt(ast.value, 10));
      }
      default:
        return null;
    }
  }
});
