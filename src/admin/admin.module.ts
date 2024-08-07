import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { Profiles } from "src/profile/entities/profile.entity";
import { AdminService } from "./admin.services";
import { AdminController } from "./admin.controller";

@Module({
  imports:[ TypeOrmModule.forFeature([Profiles]),
AuthModule ],
  controllers:[AdminController],
  providers:[AdminService],
  exports:[TypeOrmModule]
  
})




export class AdminModule{}