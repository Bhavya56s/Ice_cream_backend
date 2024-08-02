import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, MinLength, IsEnum } from "class-validator";
import { Role } from "../entities/user.entity";

export class CreatUserDto{
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name:string;
 
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({},{message: 'Please enter correct mail'})
  email : string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Role)
  role:Role;

}