import { Router } from 'express';
import { injectable } from 'inversify';

@injectable()
export abstract class AbstractRouter {
  router: Router;
  constructor() {
    this.router = Router();
  }
}
