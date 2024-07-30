import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { CreatePurchaseDto } from './dto/purchase.dto';
import { PurchaseService } from './purchase.services';

@UseGuards(AuthGuard('jwt'))
@Controller('purchase')
export class PurchaseController {
  constructor(private purchaseService: PurchaseService) {}

  @Post('/create')
  async createPurchase(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.createPurchase(createPurchaseDto);
  }

  @Get('/user/:userId')
  async getAllPurchasesByUser(@Param('userId') userId: number) {
    return this.purchaseService.getAllPurchasesByUser(userId);
  }
}
