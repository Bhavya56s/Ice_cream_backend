import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsEmail, MinLength, IsEnum } from "class-validator";
import { Role } from "src/profile/entities/profile.entity";

export class UpdateUserDto{
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  name:string;
 
  @ApiProperty()
  @IsOptional()
  @IsEmail({},{message: 'Please enter correct mail'})
  email : string

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Role)
  role:Role;

}