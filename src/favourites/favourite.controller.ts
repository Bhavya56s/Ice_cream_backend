import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { FavouriteService } from "./favourite.services";
import { CreateFavouriteDto } from "./dto/favourite.dto";
import {  ApiSecurity, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiSecurity('JWT-Auth')
@ApiTags('Favorite')
@UseGuards(AuthGuard('jwt'))
@Controller('favorite')

export class FavouriteController{
  constructor (private favouriteService:FavouriteService){}

  
  @Post('/create')
  async createPurchase(@Body() createFavouriteDto: CreateFavouriteDto) {
    return this.favouriteService.createFavourite(createFavouriteDto);
  }

  @Get('/user/:userId')
  async getallfavouritebyUser(@Param('userId') userId: number){
    return this.favouriteService.getallfavouritebyUser(userId)
  }

  @Delete('/:id')

  remove(@Param('id') id: number) {
    return this.favouriteService.remove(id);
  }

  
}