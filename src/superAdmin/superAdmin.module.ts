import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { Profiles } from "src/profile/entities/profile.entity";
import { SuperAdminController } from "./superAdmin.contoller";
import { SuperAdminService } from "./superAdmin.services";

@Module({
   imports:[ 
    TypeOrmModule.forFeature([Profiles]),
    AuthModule 
   ],
    controllers:[SuperAdminController],
    providers:[SuperAdminService],
    })


export class SuperAdminModule{}