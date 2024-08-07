import { Body, Controller, Delete, Get, Put, Req, UseGuards } from "@nestjs/common";
import { ProfileService } from "./profile.services";
import { AuthGuard } from "@nestjs/passport";
import { Profiles } from "./entities/profile.entity";
import { ApiSecurity, ApiTags } from "@nestjs/swagger";
import { UpdateProfileDto } from "./dto/profile.dto";

@ApiTags('Profile')
@ApiSecurity('JWT-Auth')
@UseGuards(AuthGuard('jwt'))
@Controller('profile')

export class ProfileController{


  constructor(private profileService:ProfileService){}
  
  @Get()
   
  async getProfile(@Req() req: any) :Promise<Profiles>{

    const id = req.user.id; 
    const profile = this.profileService.getProfile(id);

   return profile
  }

  @Put()

  async updateProfile(@Req() req: any,@Body() updateProfileDto:UpdateProfileDto){
    
    const id = req.user.id; 
    return this.profileService.updateProfile(id,updateProfileDto)
  }

  @Delete()
  async deleteProfile(@Req() req: any){
    
    const id = req.user.id; 
    return this.profileService.deleteProfile(id)
  }

}