import { Injectable } from '../di/di';
import { Users } from './models/Users';

@Injectable()
export class Model {
  /**
   * Configure the entities in this model
   */
  Users = Users;
}
