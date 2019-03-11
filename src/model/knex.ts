import Knex from 'knex';
import { registerContantValueForSymbol } from '../di/di';
import config from './config/database';

const knex: Knex = Knex(config);

export const KnexType = Symbol('Knex');

registerContantValueForSymbol(KnexType, knex);

export type KnexError = {
  name: string | 'error';
  length: number;
  severity: 'ERROR' | string;
  code: '23505' | string;
  detail: string;
  hint: undefined | any;
  position: undefined | any;
  internalPosition: undefined | any;
  internalQuery: undefined | any;
  where: undefined | any;
  schema: DB_Schemas;
  table: TableName;
  column: undefined | string;
  dataType: undefined | string;
  constraint: DB_constraints;
  file: string;
  line: string;
  routine: string;
};

export type TableName = 'users' | string;
export type DB_Schemas = 'public';
export const enum DB_constraints {
  users_email_unique = 'users_email_unique',
}
