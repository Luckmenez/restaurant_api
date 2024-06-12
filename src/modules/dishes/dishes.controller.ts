import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Post()
  create(@Body() createDishDto: CreateDishDto) {
    return this.dishesService.create(createDishDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDishDto: UpdateDishDto) {
    return this.dishesService.update(updateDishDto, id);
  }

  @Get()
  getDishes() {
    return this.dishesService.getDishes();
  }

  @Get(':id')
  getDishById(@Param('id') id: string) {
    return this.dishesService.getDishById(id);
  }
}
