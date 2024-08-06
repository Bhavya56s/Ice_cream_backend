import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, MinLength, IsEnum, IsOptional } from "class-validator";
import { Role } from "../entities/profile.entity";

export class CreatProfileDto{
  
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

export class UpdateProfileDto{
  
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