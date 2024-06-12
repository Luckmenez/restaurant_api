import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  create(@Body() createTableDto: CreateTableDto) {
    return this.tablesService.create(createTableDto);
  }

  @Put(':table_number')
  assignTable(@Param('table_number') table_number: string) {
    return this.tablesService.assignTable(table_number);
  }

  @Put(':id/checkout')
  checkoutTable(@Param('id') id: string) {
    return this.tablesService.checkoutTable(id);
  }
}
