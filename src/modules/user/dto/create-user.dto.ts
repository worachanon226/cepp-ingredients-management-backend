import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../schema/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsEnum(UserRole)
  @ApiProperty()
  readonly role: UserRole;
}
