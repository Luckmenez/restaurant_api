import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDishesDto } from './dto/update-order-dishes.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }

  @Patch(':id')
  updateOrderDishes(
    @Param('id') id: string,
    @Body() dishes: UpdateOrderDishesDto,
  ) {
    return this.ordersService.updateOrderDishes(id, dishes);
  }

  @Patch(':id/checkout')
  checkoutOrder(@Param('id') id: string) {
    return this.ordersService.checkoutOrder(id);
  }
}
