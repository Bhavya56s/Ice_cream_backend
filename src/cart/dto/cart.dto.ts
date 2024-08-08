import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCartDto{
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity:number

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  varietyId:number
}

export class UpdateCartDto{
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity:number

 
}