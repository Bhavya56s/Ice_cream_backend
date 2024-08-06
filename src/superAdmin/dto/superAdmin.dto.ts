import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, MinLength, IsEnum, IsOptional } from "class-validator";

export class CreatAdminDto{
  
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

}

export class UpdateAdminDto{
  
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

