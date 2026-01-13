import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Pulseboard API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // 1) Build a Nest testing module using the real AppModule
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // 2) Create a real Nest application (like running main.ts, but in-memory)
    app = moduleFixture.createNestApplication();

    // 3) Initialize it (register controllers, providers, routes, etc.)
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /health returns ok', async () => {
    const res = await request(app.getHttpServer()).get('/health').expect(200);

    // Terminus returns a JSON structure, but the key thing is "status": "ok"
    expect(res.body).toHaveProperty('status', 'ok');
  });

  it('POST /targets/http creates a target, and GET /targets lists it', async () => {
    // 1) Create a target
    const createRes = await request(app.getHttpServer())
      .post('/targets/http')
      .send({ name: 'google', url: 'https://www.google.com' })
      .expect(201); // Nest returns 201 for POST by default

    expect(createRes.body).toHaveProperty('id');
    expect(createRes.body).toHaveProperty('name', 'google');
    expect(createRes.body).toHaveProperty('url', 'https://www.google.com');

    const id = createRes.body.id as string;

    // 2) List targets and confirm it appears
    const listRes = await request(app.getHttpServer()).get('/targets').expect(200);

    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.some((t: any) => t.id === id)).toBe(true);
  });
});
