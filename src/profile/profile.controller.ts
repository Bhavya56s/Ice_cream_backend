import { Controller, Delete, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiSecurity, ApiTags } from "@nestjs/swagger";
import { ProfileService } from "./profile.services";
import { AdminGuard } from "src/auth/admin.gaurd";


@ApiSecurity('JWT-Auth')
@ApiTags('Profiles')
@UseGuards(AuthGuard('jwt'))
@Controller('profile')

export class ProfileController{
  constructor (private profileService:ProfileService){}

  @UseGuards(AdminGuard)
  @Get('/all')
  findAll(){
    return this.profileService.findall()
  }

  @UseGuards(AdminGuard) 
  @Get('/:id')
  findById(@Param('id') id:number){
    return this.profileService.findById(id)
  }
  @UseGuards(AdminGuard)
  @Delete('/:id')
  remove(@Param('id') id:number){
    return this.profileService.remove(id)
  }
}