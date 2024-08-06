import { Controller, Delete, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiSecurity, ApiTags } from "@nestjs/swagger";
import { ProfileService } from "./profile.services";
import { AdminGuard } from "src/auth/admin.gaurd";


@ApiSecurity('JWT-Auth')
@ApiTags('Users')
@UseGuards(AuthGuard('jwt'))
@Controller('users')

export class ProfileController{
  constructor (private userService:ProfileService){}

  @UseGuards(AdminGuard)
  @Get('/all')
  findAll(){
    return this.userService.findall()
  }

  @UseGuards(AdminGuard) 
  @Get('/:id')
  findById(@Param('id') id:number){
    return this.userService.findById(id)
  }
  @UseGuards(AdminGuard)
  @Delete('/:id')
  remove(@Param('id') id:number){
    return this.userService.remove(id)
  }
}