import { Module } from "@nestjs/common";
import { Product } from "./entity/product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports:[ TypeOrmModule.forFeature([Product]),
AuthModule ],
  controllers:[ProductController],
  providers:[ProductService],
  exports:[TypeOrmModule]
  
})

 
export class ProductModule{}
