import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "./entity/review.entity";
import { ReviewController } from "./review.controller";
import { ReviewService } from "./review.services";
import { Profiles } from "src/profile/entities/profile.entity";
import { Variety } from "src/variety/entity/variety.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Review,Profiles,Variety])],
  controllers:[ReviewController],
  providers:[ReviewService],
  exports:[TypeOrmModule]

})

export class ReviewModule{} 