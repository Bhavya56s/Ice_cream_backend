import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class CreatePurchaseDto {

  @ApiProperty({
    description:"The quantity of the purchase",
   
  })
  @IsNotEmpty()
  @IsNumber()
  quantity:number;

  @ApiProperty({
    description:"ID of user",
   })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description:"ID of variety u want to purchase",
   })
  @IsInt()
  @IsNotEmpty()
  varietyId: number;


}