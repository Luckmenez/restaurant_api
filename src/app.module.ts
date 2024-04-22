import { Module } from '@nestjs/common';
import { OrdersModule } from './modules/orders/orders.module';
import { DishesModule } from './modules/dishes/dishes.module';
import { TablesModule } from './modules/tables/tables.module';

@Module({
  imports: [OrdersModule, DishesModule, TablesModule],
})
export class AppModule {}
