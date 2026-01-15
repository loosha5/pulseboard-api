import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
// import { CheckResult, Target } from './target.types';
import { PrismaService } from '../database/prisma.service';
import type { CheckResult, Target } from '@prisma/client';
@Injectable()
export class TargetsService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly targets: Target[] = [];
  private readonly latestResults = new Map<string, CheckResult>();

  async listTargets(): Promise<Target[]> {
    return await this.prisma.target.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async createHttpTarget(name: string, url: string): Promise<Target> {
    return await this.prisma.target.create({
      data: { name, url, type: 'http', enabled: true },
    });
  }

  async getLatestResult(targetId: string): Promise<CheckResult | null> {
    return await this.prisma.checkResult.findFirst({
      where: { targetId },
      orderBy: { checkedAt: 'desc' },
    });
  }

  // Minimal “runner”: every 30s check enabled targets
  @Interval(30_000)
  async runChecks(): Promise<void> {
    const enabled = await this.prisma.target.findMany({
      where: { enabled: true },
    });

    for (const t of enabled) {
      const started = Date.now();

      try {
        const res = await fetch(t.url, { method: 'GET' });
        const latencyMs = Date.now() - started;

        await this.prisma.checkResult.create({
          data: {
            targetId: t.id,
            status: res.ok ? 'UP' : 'DOWN',
            checkedAt: new Date(),
            latencyMs,
            message: `HTTP ${res.status}`,
          },
        });
      } catch (err) {
        const latencyMs = Date.now() - started;

        await this.prisma.checkResult.create({
          data: {
            targetId: t.id,
            status: 'DOWN',
            checkedAt: new Date(),
            latencyMs,
            message: err instanceof Error ? err.message : 'Unknown error',
          },
        });
      }
    }
  }
}
