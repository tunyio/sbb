import { Module } from '@nestjs/common';
import { BackgroundJobsService } from './background-jobs.service';
import { PrismaModule } from '../prisma/prisma.module';
import { QueueBgJobsModule } from '../queue/background-jobs/queue-bg-jobs.module';

@Module({
  imports: [PrismaModule, QueueBgJobsModule],
  providers: [BackgroundJobsService]
})
export class BackgroundJobsModule {}
