// Update with your config settings.
require('dotenv').config();

const runningMigrations = process.env.RUNNING_MIGRATIONS === 'true';
// Either generate new migration in src dir or run migration from dist dir
const migrationsDirectory = `./${
  runningMigrations ? 'dist' : 'src'
}/model/migrations`;

console.log({ env: process.env.NODE_ENV });

module.exports = {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'migrations',
    directory: migrationsDirectory,
    stub: './src/model/migrations/stub/migration.ts',
  },
  seeds: {
    directory: './dist/model/migrations/seeds',
  },
};
