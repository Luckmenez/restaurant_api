import { Injectable } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DishesService {
  constructor(private prismaClient: PrismaClient) {}
  create(createDishDto: CreateDishDto) {
    const result = this.prismaClient.dish.create({
      data: {
        name: createDishDto.name,
        price: parseFloat(createDishDto.price),
        description: createDishDto.description,
        category: createDishDto.category,
        preparationTime: parseFloat(createDishDto.preparationTime),
        image: createDishDto.image,
      },
    });
    return result;
  }
}
