import { IsNotEmpty } from "class-validator";

export class CreateVarietyDto{

  @IsNotEmpty()
  name:string;

  @IsNotEmpty()
  description:string;

  @IsNotEmpty()
  price:number;

  @IsNotEmpty()
  availabale:number;

  @IsNotEmpty()
  product_id:number;
}