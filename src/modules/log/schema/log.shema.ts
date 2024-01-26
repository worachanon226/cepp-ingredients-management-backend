import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Log {
  @Prop()
  restaurantId: string;

  @Prop()
  menuId: string;

  @Prop()
  ingredientId: string;

  @Prop()
  ingredientAmount: number;
}

export const LogSchema = SchemaFactory.createForClass(Log);
