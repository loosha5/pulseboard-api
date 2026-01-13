import { ApiProperty } from '@nestjs/swagger';

export class CheckResultDto {
  @ApiProperty({ example: '0b6f9b8b-8fd0-4e3a-9f3c-0b9d2e0f9c1a' })
  targetId!: string;

  @ApiProperty({ example: 'UP', enum: ['UP', 'DOWN', 'UNKNOWN'] })
  status!: 'UP' | 'DOWN' | 'UNKNOWN';

  @ApiProperty({ example: '2026-01-13T10:00:00.000Z', nullable: true })
  checkedAt!: string | null;

  @ApiProperty({ example: 123, nullable: true })
  latencyMs!: number | null;

  @ApiProperty({ example: 'HTTP 200', required: false })
  message?: string;
}
