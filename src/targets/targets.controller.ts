import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TargetsService } from './targets.service';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateHttpTargetDto } from './dto/create-http-target.dto';
import { TargetDto } from './dto/target.dto';
import { CheckResultDto } from './dto/check-result.dto';

@ApiTags('targets')
@Controller()
export class TargetsController {
  constructor(private readonly targets: TargetsService) {}

  @Get('targets')
  @ApiOkResponse({ type: TargetDto, isArray: true })
  async list() {
    return await this.targets.listTargets();
  }

  @Post('targets/http')
  @ApiBody({ type: CreateHttpTargetDto })
  @ApiCreatedResponse({ type: TargetDto })
  async createHttp(@Body() dto: CreateHttpTargetDto) {
    return await this.targets.createHttpTarget(dto.name, dto.url);
  }

  @Get('targets/:id/status')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: CheckResultDto })
  async latestStatus(@Param('id') id: string) {
    return (
      (await this.targets.getLatestResult(id)) ?? {
        targetId: id,
        status: 'UNKNOWN',
        checkedAt: null,
        latencyMs: null,
        message: 'No checks run yet',
      }
    );
  }
}
