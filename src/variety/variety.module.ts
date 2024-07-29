import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { Variety } from "./entity/variety.entity";
import { VarietyController } from "./variety.controller";
import { VarietyService } from "./variety.services";
import { ProductModule } from "src/product/product.model";

@Module({
  imports:[ TypeOrmModule.forFeature([Variety]),
AuthModule ,ProductModule],
  controllers:[VarietyController],
  providers:[VarietyService],
  
})




export class VarietyModule{}