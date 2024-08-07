import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { SuperAdminService } from "./superAdmin.services";
import { CreatAdminDto, UpdateAdminDto } from "./dto/superAdmin.dto";
import { ApiSecurity, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { SuperAdminGuard } from "src/auth/superadmin.gaurd";

@ApiSecurity('JWT-Auth')
@UseGuards(AuthGuard('jwt'),SuperAdminGuard)
@ApiTags('SuperAdmin Panel')
@Controller('/admin')


export class SuperAdminController{
  constructor (private superAdminService:SuperAdminService){}
  @Post('/create')
  
  create(@Body()  createAdminDto: CreatAdminDto){
    return this.superAdminService.create(createAdminDto);
  }

  @Get('/all')

  findAll(){
    return this.superAdminService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id:number){
    return this.superAdminService.findById(id)
  }

  @Delete('/:id')
  remove(@Param('id') id:number){
    return this.superAdminService.remove(id)
  }

  @Put('/:id')
  updateInfo(@Param('id') id:number,@Body() updateAdminDto:UpdateAdminDto){
    return this.superAdminService.updateInfo(id,updateAdminDto)
  }
}