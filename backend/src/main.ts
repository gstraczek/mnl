import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as MongoDBStore from 'express-mongodb-session';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const mongoDBStore = MongoDBStore(session);
  const store = new mongoDBStore({
    uri: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    collection: 'sessions',
  });
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SECRET_KEY,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'none',
    },
    store,
    resave: true,
    saveUninitialized: true,
  };
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
