import { Injectable } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { PrismaClient } from '@prisma/client';
import { UpdateDishDto } from './dto/update-dish.dto';

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

  async update(updateDishDto: UpdateDishDto, id: string) {
    const { price, preparationTime, ...otherFields } = updateDishDto;
    const updatedDishe = await this.prismaClient.dish.update({
      where: { id },
      data: {
        ...otherFields,
        preparationTime: parseFloat(preparationTime),
        price: parseFloat(price),
      },
    });

    return updatedDishe;
  }

  async getDishes() {
    const dishList = await this.prismaClient.dish.findMany();
    return dishList;
  }

  async getDishById(id: string) {
    const dish = await this.prismaClient.dish.findUnique({
      where: { id },
    });
    return dish;
  }
}
