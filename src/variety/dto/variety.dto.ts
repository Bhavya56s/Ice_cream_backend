import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateVarietyDto{
  
  @IsString()
  @IsNotEmpty()
  name:string;
   
  @IsString()
  @IsNotEmpty()
  description:string;

  @IsNumber()
  @IsNotEmpty()
  price:number;

  @IsNumber()
  @IsNotEmpty()
  availabale:number;

  @IsNumber()
  @IsNotEmpty()
  product_id:number;
}

export class UpdateVarietyDto {
  @IsString()
  @IsOptional()
  name : string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsOptional()
  availabale: number;

  


}