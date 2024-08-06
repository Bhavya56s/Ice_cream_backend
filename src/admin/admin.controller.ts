import { Body, Controller, Delete, Get, Param, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiSecurity, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "src/auth/admin.gaurd";
import { AdminService } from "./admin.services";
import { UpdateAdminDto } from "src/superAdmin/dto/superAdmin.dto";
import { UpdateUserDto } from "./dto/admin.dto";


@ApiSecurity('JWT-Auth')
@ApiTags('Admin Functionalities')
@UseGuards(AuthGuard('jwt'))
@Controller('/user')

export class AdminController{
  constructor (private adminService:AdminService){}

  @UseGuards(AdminGuard)
  @Get('/all')
  findAll(){
    return this.adminService.findall()
  }

  @UseGuards(AdminGuard) 
  @Get('/:id')
  findById(@Param('id') id:number){
    return this.adminService.findById(id)
  }
  @UseGuards(AdminGuard)
  @Delete('/:id')
  remove(@Param('id') id:number){
    return this.adminService.remove(id)
  }

  @Put('/:id')
  updateInfo(@Param('id') id:number,@Body() updateUserDto:UpdateUserDto){
    return this.adminService.updateInfo(id,updateUserDto)
  }
}
