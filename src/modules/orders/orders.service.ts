import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaClient } from '@prisma/client';
import { UpdateOrderDishesDto } from './dto/update-order-dishes.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaClient) {}

  async create(createOrderDto: CreateOrderDto) {
    const table = await this.prisma.table.findUnique({
      where: { number: parseInt(createOrderDto.table) },
    });

    if (!table) {
      throw new HttpException('Table not found', HttpStatus.NOT_FOUND);
    }

    if (table.status === 'AVAILABLE') {
      throw new HttpException('Table is already taken', HttpStatus.BAD_REQUEST);
    }

    await this.prisma.table.update({
      where: { number: parseInt(createOrderDto.table) },
      data: { status: 'AVAILABLE' },
    });

    const order = await this.prisma.order.create({
      data: {
        table: { connect: { number: parseInt(createOrderDto.table) } },
        total_price: 0,
        status: 'OPEN',
      },
    });

    return order;
  }

  async getOrderById(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { dishes: true },
    });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return order;
  }

  async updateOrderDishes(id: string, dishes: UpdateOrderDishesDto) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    if (order.status === 'CLOSED') {
      throw new HttpException(
        'Order is already closed',
        HttpStatus.BAD_REQUEST,
      );
    }

    const dishesIds = dishes.dishes.map((dish) => dish.id);

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        dishes: {
          connect: dishesIds.map((id) => ({ id })),
        },
      },
    });

    return updatedOrder;
  }

  async checkoutOrder(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    if (order.status === 'CLOSED') {
      throw new HttpException(
        'Order is already closed',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        status: 'CLOSED',
      },
    });

    return updatedOrder;
  }
}
