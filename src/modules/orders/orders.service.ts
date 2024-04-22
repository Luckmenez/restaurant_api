import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaClient } from '@prisma/client';

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

    if (table.status === 'OPEN') {
      throw new HttpException('Table is already taken', HttpStatus.BAD_REQUEST);
    }

    await this.prisma.table.update({
      where: { number: parseInt(createOrderDto.table) },
      data: { status: 'OPEN' },
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
}
