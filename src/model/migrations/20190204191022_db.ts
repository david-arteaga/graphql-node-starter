import Knex from 'knex';

/**
\c postgres
DROP DATABASE toptal;
CREATE DATABASE toptal;
\c toptal;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

 */

export async function up(knex: Knex) {
  const schema = knex.schema.createTable('users', table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name').notNullable();
    table
      .string('email')
      .notNullable()
      .unique();
    table.string('password').notNullable();

    table.index(['email']);
  });

  return schema;
}

export function down(knex: Knex) {
  return knex.schema.dropTableIfExists('users');
}
