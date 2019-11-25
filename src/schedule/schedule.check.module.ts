import { Module } from '@nestjs/common';
import { ScheduleModule } from 'nest-schedule';
import { ScheduleService } from './schedule.check.service';

@Module({
  imports: [
    ScheduleModule.register(),
  ],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleCheckModule {}
