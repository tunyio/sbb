import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BackgroundJobsService {
  constructor(private prisma: PrismaService) {}
}
