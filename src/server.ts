import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import App from './app';
import AuthenticationController from './authentication/authentication.controller';
import config from './ormconfig';
import PostController from './post/post.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

(async () => {
  try {
    await createConnection(config);
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }
  const app = new App(
    [
      new PostController(),
      new AuthenticationController(),
    ],
  );
  app.listen();
})();
