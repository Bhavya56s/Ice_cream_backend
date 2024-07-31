import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto {

  @ApiProperty({
    description:"Name of Product"
  })
  @IsString()
  @IsNotEmpty()
  name:string
 
}