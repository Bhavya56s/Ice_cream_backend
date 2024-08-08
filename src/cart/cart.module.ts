import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { Profiles } from "src/profile/entities/profile.entity";
import { Variety } from "src/variety/entity/variety.entity";
import { CartServices } from "./cart.service";
import { CartController } from "./cart.contoller";
import { Cart } from "./entity/cart.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Profiles, Variety,Cart]),
    AuthModule,
  ],
  controllers: [CartController],
  providers: [CartServices],
})

export class CartModule{}
