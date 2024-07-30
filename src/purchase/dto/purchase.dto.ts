import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class CreatePurchaseDto {
  @IsNotEmpty()
  @IsNumber()
  quantity:number;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  varietyId: number;


}