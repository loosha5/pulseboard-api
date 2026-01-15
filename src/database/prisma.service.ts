import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { env } from '../config/env';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaBetterSqlite3({ url: env.DATABASE_URL });
    super({ adapter });
  }
}
