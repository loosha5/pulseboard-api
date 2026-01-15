import { Test, TestingModule } from '@nestjs/testing';
import { TargetsController } from './targets.controller';
import { TargetsService } from './targets.service';

describe('TargetsController', () => {
  let controller: TargetsController;

  const serviceMock = {
    listTargets: jest.fn(),
    createHttpTarget: jest.fn(),
    getLatestResult: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TargetsController],
      providers: [{ provide: TargetsService, useValue: serviceMock }],
    }).compile();

    controller = module.get<TargetsController>(TargetsController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('POST /targets/http calls createHttpTarget on the service', async () => {
    serviceMock.createHttpTarget.mockReturnValue({
      id: 'id-1',
      name: 'google',
      type: 'http',
      url: 'https://www.google.com',
      enabled: true,
      createdAt: new Date().toISOString(),
    });

    const result = await controller.createHttp({
      name: 'google',
      url: 'https://www.google.com',
    });
    expect(result).toMatchObject({ id: 'id-1', name: 'google' });
  });
});
