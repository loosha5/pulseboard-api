import { ApiProperty } from '@nestjs/swagger';

export class TargetDto {
  @ApiProperty({ example: '0b6f9b8b-8fd0-4e3a-9f3c-0b9d2e0f9c1a' })
  id!: string;

  @ApiProperty({ example: 'Google homepage' })
  name!: string;

  @ApiProperty({ example: 'http', enum: ['http'] })
  type!: 'http';

  @ApiProperty({ example: 'https://www.google.com' })
  url!: string;

  @ApiProperty({ example: true })
  enabled!: boolean;

  @ApiProperty({ example: '2026-01-13T10:00:00.000Z' })
  createdAt!: string;
}
