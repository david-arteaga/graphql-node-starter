import Knex from 'knex';

export const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  },
  debug: (process.env.DEBUG_KNEX || '').toLowerCase() === 'true',
  pool: {
    max: 1,
    min: 1
  }
};

export default config;
