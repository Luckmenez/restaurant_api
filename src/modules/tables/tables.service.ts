import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TablesService {
  constructor(private prisma: PrismaClient) {}
  async create(createTableDto: CreateTableDto) {
    const existingTable = await this.prisma.table.findUnique({
      where: { number: Number(createTableDto.number) },
    });

    if (existingTable) {
      throw new ConflictException('This table number is already taken.');
    }

    const insertedData = await this.prisma.table.create({
      data: {
        number: Number(createTableDto.number),
      },
    });

    return insertedData;
  }

  async assignTable(table_number: string) {
    const table = await this.prisma.table.findUnique({
      where: { number: Number(table_number) },
    });

    if (!table) {
      throw new ConflictException('Table not found.');
    }

    if (table.status === 'OCCUPIED') {
      throw new ConflictException('Table is already occupied.');
    }

    return this.prisma.table.update({
      where: { number: Number(table_number) },
      data: { status: 'OCCUPIED' },
    });
  }

  async checkoutTable(id: string) {
    const table = await this.prisma.table.findUnique({
      where: { id },
    });

    if (!table) {
      throw new ConflictException('Table not found.');
    }

    if (table.status === 'AVAILABLE') {
      throw new ConflictException('Table is already available.');
    }

    return this.prisma.table.update({
      where: { id },
      data: { status: 'AVAILABLE' },
    });
  }
}
