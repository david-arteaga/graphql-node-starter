import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { Express } from 'express';
import logger from 'morgan';
import passport from 'passport';
import { authenticateAndPass } from './auth/authentication';
import { passportConfigureStrategies } from './auth/passport-config';
import { server as graphqlServer } from './graphql/server';

const expressApp = express();

middleware(expressApp);
configPassport(expressApp);
routes(expressApp);

export default expressApp;

function middleware(app: Express) {
  app.use(cors());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
}

function configPassport(app: Express) {
  passportConfigureStrategies();
  app.use(passport.initialize());
}

function routes(app: Express) {
  app.use('/api', authenticateAndPass);
  graphqlServer.applyMiddleware({
    app,
    path: '/api/graphql',
  });
}
