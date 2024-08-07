import { ApiProperty } from "@nestjs/swagger";
import {  IsString, IsEmail, MinLength, IsEnum, IsOptional } from "class-validator";
import { Role } from "../entities/profile.entity";



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

 

}