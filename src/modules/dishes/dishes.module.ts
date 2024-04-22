import { Module } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [DishesController],
  providers: [DishesService, PrismaClient],
})
export class DishesModule {}
