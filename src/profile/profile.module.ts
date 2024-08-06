import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { Profiles } from "./entities/profile.entity";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.services";

@Module({
  imports:[ TypeOrmModule.forFeature([Profiles]),
AuthModule ],
  controllers:[ProfileController],
  providers:[ProfileService],
  
})




export class ProfileModule{}