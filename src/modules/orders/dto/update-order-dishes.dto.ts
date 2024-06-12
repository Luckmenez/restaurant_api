import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateDishDto as DishDto } from 'src/modules/dishes/dto/create-dish.dto';

class DishWithIdDto extends DishDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class UpdateOrderDishesDto {
  @ApiProperty()
  @IsNotEmpty()
  dishes: DishWithIdDto[];
}
