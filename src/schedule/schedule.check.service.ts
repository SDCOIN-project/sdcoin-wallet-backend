import { Injectable } from '@nestjs/common';
import { Interval, NestSchedule } from 'nest-schedule';

@Injectable()
export class ScheduleService extends NestSchedule {
  constructor() {
    super();
  }

  @Interval(10000, {
    waiting: true,
  })
  async intervalJob() {
    // type logic here
  }
}
