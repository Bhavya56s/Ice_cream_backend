import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateFavouriteDto{
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


