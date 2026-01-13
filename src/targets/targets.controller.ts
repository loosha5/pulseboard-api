import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TargetsService } from './targets.service';

@Controller()
export class TargetsController {
  constructor(private readonly targets: TargetsService) {}

  @Get('targets')
  list() {
    return this.targets.listTargets();
  }

  @Post('targets/http')
  createHttp(@Body() body: { name: string; url: string }) {
    if (!body?.name || !body?.url) {
      return { error: 'name and url are required' };
    }
    return this.targets.createHttpTarget(body.name, body.url);
  }

  @Get('targets/:id/status')
  latestStatus(@Param('id') id: string) {
    return this.targets.getLatestResult(id) ?? { status: 'UNKNOWN' };
  }
}
