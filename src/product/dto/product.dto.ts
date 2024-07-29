import { IsNotEmpty } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  name:string
 
}