import Knex from 'knex';

// const geographyPoint = 'geography(point, 4326)';
// const geographyMultiPoint = 'geography(MultiPoint, 4326)';

export function up(knex: Knex, _: PromiseConstructor) {
  const schema = knex.schema.createTable('table_name', table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));
  });

  return schema;
}

export function down(knex: Knex, _: PromiseConstructor) {
  return knex.schema.dropTableIfExists('table_name');
}
