import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, Length } from 'class-validator';

export class CreateHttpTargetDto {
  @ApiProperty({ example: 'Google homepage' })
  @IsString()
  @Length(1, 80)
  name!: string;

  @ApiProperty({ example: 'https://www.google.com' })
  @IsString()
  @IsUrl({ require_protocol: true })
  url!: string;
}
