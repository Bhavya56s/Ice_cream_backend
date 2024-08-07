import { Body, Controller, Delete, Get, Param, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiSecurity, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "src/auth/admin.gaurd";
import { AdminService } from "./admin.services";
import { UpdateUserDto } from "./dto/admin.dto";
import { SuperAdminGuard } from "src/auth/superadmin.gaurd";

@UseGuards(AdminGuard,SuperAdminGuard)
@ApiSecurity('JWT-Auth')
@ApiTags('Admin Panel')
@UseGuards(AuthGuard('jwt'))
@Controller('/user')

export class AdminController{
  constructor (private adminService:AdminService){}

 
  @Get('/all')
  findAll(){
    return this.adminService.findall()
  }

  
  @Get('/:id')
  findById(@Param('id') id:number){
    return this.adminService.findById(id)
  }
  
  @Delete('/:id')
  remove(@Param('id') id:number){
    return this.adminService.remove(id)
  }

  @Put('/:id')
  updateInfo(@Param('id') id:number,@Body() updateUserDto:UpdateUserDto){
    return this.adminService.updateInfo(id,updateUserDto)
  }
}
