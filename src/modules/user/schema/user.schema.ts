import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum AllRole {
  OWNER = 'owner',
  MANAGER = 'manager',
  STOCKCONTROLLER = 'stockcontroller',
  EMPLOYEE = 'employee',
}
export enum UserRole {
  MANAGER = 'manager',
  STOCKCONTROLLER = 'stockcontroller',
  EMPLOYEE = 'employee',
}

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password?: string;

  @Prop()
  name: string;

  @Prop({
    enum: AllRole,
    default: 'employee',
  })
  role: AllRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
