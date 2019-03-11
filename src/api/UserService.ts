import bcryptjs from 'bcryptjs';
import Knex from 'knex';
import { getJwtToken } from '../auth/jwt-config';
import { Inject, Injectable } from '../di/di';
import { DB_constraints, KnexError } from '../model/knex';
import { Model } from '../model/model';
import { Users } from '../model/models/Users';
import { Omit } from '../utils/TypeUtil';
import { pick } from '../utils/utils';
import { BaseService } from './base/base-service';

const salt = 10;

@Injectable()
export class UserService extends BaseService {
  constructor(@Inject(Model) model: Model) {
    super(model);
  }

  public async auth(
    email: any,
    password: any,
  ): Promise<{
    token?: string;
    user?: Users.Type;
    userMissing?: boolean;
    wrongPass?: boolean;
  }> {
    const user = await this.findByEmail(email);
    if (!user) {
      return { userMissing: true };
    }
    const valid = await bcryptjs.compare(password, user.password);
    if (!valid) {
      return { wrongPass: true };
    }
    return {
      user,
      token: getJwtToken(user),
    };
  }

  public async new(
    user: Omit<DB.users, 'id'>,
  ): Promise<{ user?: Users.Type; emailExistsError?: boolean }> {
    console.log('will create user', user);
    const toInsert: Omit<DB.users, 'id'> = {
      ...pick(user, ['name', 'email']),
      password: await bcryptjs.hash(user.password, salt),
    };
    try {
      const { id } = await new this.model.Users().save(toInsert);
      return {
        user: await new this.model.Users({ id }).fetch().then(a => a.toJSON()),
      };
    } catch (_e) {
      const e: KnexError = _e;
      switch (e.constraint) {
        case DB_constraints.users_email_unique: {
          return { emailExistsError: true };
        }
      }
      throw new Error();
    }
  }

  async findByEmail(email: string, transacting?: Knex.Transaction) {
    const user = await new this.model.Users({ email }).fetch({
      transacting,
    });
    return user ? (user.toJSON() as Users.Type) : null;
  }

  async findById(id: string, transacting?: Knex.Transaction) {
    const user = await new this.model.Users({ id }).fetch({
      transacting,
    });
    return user ? (user.toJSON() as Users.Type) : null;
  }
}
