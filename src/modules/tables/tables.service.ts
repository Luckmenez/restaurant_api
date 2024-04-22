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
        status: createTableDto.status,
      },
    });

    return insertedData;
  }
}
