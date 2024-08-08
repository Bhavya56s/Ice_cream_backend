import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiSecurity, ApiTags } from "@nestjs/swagger";
import { CreateCartDto, UpdateCartDto } from "./dto/cart.dto";
import { CartServices } from "./cart.service";
import { create } from "domain";
import { AuthGuard } from "@nestjs/passport";

@ApiTags('Cart')
@UseGuards(AuthGuard('jwt'))
@ApiSecurity('JWT-Auth')
@Controller('/cart')


export class CartController{
  
   constructor(private cartServices:CartServices){}

  @Post('/create')

  async createCart(@Req() req:any,@Body() createCartDto:CreateCartDto){
    const id = req.user.id

    return this.cartServices.createCart(id,createCartDto)
  }
  @Get()
   
  async getCart(@Req() req: any){

    const id = req.user.id; 
    const profile = this.cartServices.getCart(id);

   return profile
  }

  @Put('/:id')
  async updateCart(@Req() req: any, @Body() updateCartDto: UpdateCartDto, @Param('id') id: number) {
    const userId = req.user.id;
    return await this.cartServices.updateCart(userId, id, updateCartDto);
  }

  @Delete('/:id')

  async deleteCart(@Req() req: any, @Param('id') id: number){
    const userId = req.user.id;
    return await this.cartServices.deleteCart(userId, id);

  }
}