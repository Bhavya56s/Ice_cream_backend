import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseController } from './purchase.controller';
import { Purchase } from './entities/purchase.entity';
import { User } from 'src/users/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Variety } from 'src/variety/entity/variety.entity';
import { PurchaseService } from './purchase.services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase, User, Variety]),
    AuthModule,
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}
