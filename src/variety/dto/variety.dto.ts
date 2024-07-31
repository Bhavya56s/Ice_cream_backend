import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateVarietyDto{

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name:string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description:string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price:number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  availabale:number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  product_id:number;
}

export class UpdateVarietyDto {

  @ApiProperty()
  @IsString()
  @IsOptional()
  name : string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  availabale: number;

}