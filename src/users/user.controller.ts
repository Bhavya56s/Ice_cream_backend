import { Controller, Delete, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiSecurity, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.services";
import { AdminGuard } from "src/auth/admin.gaurd";


@ApiSecurity('JWT-Auth')
@ApiTags('Users')
@UseGuards(AuthGuard('jwt'))
@Controller('users')

export class UserController{
  constructor (private userService:UserService){}

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