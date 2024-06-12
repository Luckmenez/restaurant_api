import { Module } from '@nestjs/common';
import { OrdersModule } from './modules/orders/orders.module';
import { DishesModule } from './modules/dishes/dishes.module';
import { TablesModule } from './modules/tables/tables.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [OrdersModule, DishesModule, TablesModule, WebsocketModule],
})
export class AppModule {}
