import { Prop, SchemaFactory } from '@nestjs/mongoose';

export enum UserRole {
  OWNER = 'owner',
  MANAGER = 'manager',
  STOCKCONTROLLER = 'stockcontroller',
  EMPLOYEE = 'employee',
}

export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop({
    enum: UserRole,
    default: 'employee',
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
