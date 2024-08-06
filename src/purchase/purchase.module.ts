import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseController } from './purchase.controller';
import { Purchase } from './entities/purchase.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Variety } from 'src/variety/entity/variety.entity';
import { PurchaseService } from './purchase.services';
import { Profiles } from 'src/profile/entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase, Profiles, Variety]),
    AuthModule,
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}
