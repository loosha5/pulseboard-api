import { TargetsService } from './targets.service';

describe('TargetsService (unit)', () => {
  function makePrismaMock() {
    return {
      target: {
        create: jest.fn(),
        findMany: jest.fn(),
      },
      checkResult: {
        findFirst: jest.fn(),
      },
    };
  }

  it('createHttpTarget calls prisma.target.create with expected defaults', async () => {
    const prisma = makePrismaMock();
    const service = new TargetsService(prisma as any);

    prisma.target.create.mockResolvedValue({
      id: 't1',
      name: 'google',
      type: 'http',
      url: 'https://www.google.com',
      enabled: true,
      createdAt: new Date('2026-01-15T00:00:00.000Z'),
    });

    const target = await service.createHttpTarget('google', 'https://www.google.com');

    expect(prisma.target.create).toHaveBeenCalledWith({
      data: {
        name: 'google',
        url: 'https://www.google.com',
        type: 'http',
        enabled: true,
      },
    });

    expect(target.name).toBe('google');
    expect(target.type).toBe('http');
    expect(target.url).toBe('https://www.google.com');
    expect(target.enabled).toBe(true);
  });

  it('listTargets returns prisma results ordered by createdAt desc', async () => {
    const prisma = makePrismaMock();
    const service = new TargetsService(prisma as any);

    prisma.target.findMany.mockResolvedValue([
      {
        id: 'b',
        name: 'b',
        type: 'http',
        url: 'https://b.com',
        enabled: true,
        createdAt: new Date(),
      },
      {
        id: 'a',
        name: 'a',
        type: 'http',
        url: 'https://a.com',
        enabled: true,
        createdAt: new Date(),
      },
    ]);

    const targets = await service.listTargets();

    expect(prisma.target.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: 'desc' },
    });

    expect(targets).toHaveLength(2);
  });
});
