import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { VarietyModule } from './variety/variety.module';
import { PurchaseModule } from './purchase/purchase.module';
import { FavouriteModule } from './favourites/favourite.module';
import { UserModule } from './users/user.module';

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
    database:'ice_cream',
    autoLoadEntities:true,
    synchronize:true
    
  }),
AuthModule,ProductModule,VarietyModule,PurchaseModule,FavouriteModule,UserModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

