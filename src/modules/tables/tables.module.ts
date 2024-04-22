import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [TablesController],
  providers: [TablesService, PrismaClient],
})
export class TablesModule {}
