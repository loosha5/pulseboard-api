export type TargetType = 'http';

export interface Target {
  id: string;
  name: string;
  type: TargetType;
  url: string;
  enabled: boolean;
  createdAt: string; // ISO
}

export type CheckStatus = 'UP' | 'DOWN';

export interface CheckResult {
  targetId: string;
  status: CheckStatus;
  checkedAt: string; // ISO
  latencyMs: number;
  message?: string;
}
