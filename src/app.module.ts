import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Variety } from './variety/entity/variety.entity';
import { Product } from './product/entity/product.entity';
import { ProductModule } from './product/product.model';
import { VarietyModule } from './variety/variety.module';
import { Purchase } from './purchase/entities/purchase.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3307,
    username:'root',
    password:'root',
    database:'ice_cream_app',
    entities:[Purchase,User,Product,Variety],
    synchronize:false
  }),
AuthModule,ProductModule,VarietyModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
