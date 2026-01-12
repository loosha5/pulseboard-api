import { Injectable } from '@nestjs/common';
import { env } from './env';

@Injectable()
export class AppConfigService {
  // raw access if you ever want it
  get all() {
    return env;
  }

  get nodeEnv() {
    return env.NODE_ENV;
  }

  get isProd() {
    return env.NODE_ENV === 'production';
  }

  get port() {
    return env.PORT;
  }

  get appName() {
    return env.APP_NAME;
  }

  get databaseUrl() {
    return env.DATABASE_URL;
  }
}
