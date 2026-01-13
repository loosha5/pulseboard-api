import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { randomUUID } from 'crypto';
import { CheckResult, Target } from './target.types';

@Injectable()
export class TargetsService {
  private readonly targets: Target[] = [];
  private readonly latestResults = new Map<string, CheckResult>();

  listTargets(): Target[] {
    return this.targets;
  }

  createHttpTarget(name: string, url: string): Target {
    const target: Target = {
      id: randomUUID(),
      name,
      type: 'http',
      url,
      enabled: true,
      createdAt: new Date().toISOString(),
    };

    this.targets.push(target);
    return target;
  }

  getLatestResult(targetId: string): CheckResult | undefined {
    return this.latestResults.get(targetId);
  }

  // Minimal “runner”: every 30s check enabled targets
  @Interval(30_000)
  async runChecks(): Promise<void> {
    const enabled = this.targets.filter((t) => t.enabled);

    for (const t of enabled) {
      const started = Date.now();

      try {
        const res = await fetch(t.url, { method: 'GET' });
        const latencyMs = Date.now() - started;

        const status: CheckResult = {
          targetId: t.id,
          status: res.ok ? 'UP' : 'DOWN',
          checkedAt: new Date().toISOString(),
          latencyMs,
          message: `HTTP ${res.status}`,
        };

        this.latestResults.set(t.id, status);
      } catch (err) {
        const latencyMs = Date.now() - started;

        this.latestResults.set(t.id, {
          targetId: t.id,
          status: 'DOWN',
          checkedAt: new Date().toISOString(),
          latencyMs,
          message: err instanceof Error ? err.message : 'Unknown error',
        });
      }
    }
  }
}
