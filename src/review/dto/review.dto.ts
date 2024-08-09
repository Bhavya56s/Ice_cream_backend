import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Max, Min } from "class-validator";

export class CreateReviewDto{
  @ApiProperty()
  @IsNotEmpty()
  @Min(0.01)
  @Max(5)
  rating:number
  
  
}