import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { FavouriteController } from "./favourite.controller";
import { FavouriteService } from "./favourite.services";
import { Favourite } from "./entity/favourite.entity";
import { Variety } from "src/variety/entity/variety.entity";
import { Profiles } from "src/profile/entities/profile.entity";

@Module({
  imports:[ TypeOrmModule.forFeature([Favourite,Profiles,Variety]),
AuthModule ],
  controllers:[FavouriteController],
  providers:[FavouriteService],
  exports:[TypeOrmModule]
  
})

 
export class FavouriteModule{}
