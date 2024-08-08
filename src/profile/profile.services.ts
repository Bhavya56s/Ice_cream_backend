import { Injectable, NotFoundException } from "@nestjs/common";
import { Profiles } from "./entities/profile.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { classToPlain } from "class-transformer";
import { UpdateProfileDto } from "./dto/profile.dto";
import { log } from "console";

@Injectable()

export class ProfileService{
  constructor(@InjectRepository(Profiles)
private profileRepository:Repository<Profiles>){}


  async getProfile(id: number): Promise<any> {
    
    
 
    const profile = await this.profileRepository.findOne({where:{id}});

    if (!profile) {
      throw new NotFoundException('Profile not found.');
    }

    return classToPlain(profile);
}

async updateProfile(id:number,UpdateProfileDto:UpdateProfileDto):Promise<{message:string}>{

  const profile = await this.profileRepository.findOne({where:{id}})

  if(!profile){
    throw new NotFoundException('Profile not found')
  }
  const updated = await this.profileRepository.update(id,UpdateProfileDto)

  if(!updated){
    throw new NotFoundException('Updations can not be done')
  }

  return {message:`Updations done sucessfully`}
}
async deleteProfile(id:number):Promise<{message:string}>{

  const profile = await this.profileRepository.findOne({where:{id}})

  if(!profile){
    throw new NotFoundException('Profile not found')
  }
  const deleted = await this.profileRepository.delete(id)

  if(!deleted){
    throw new NotFoundException('Profile Cannot be deleted')
  }

  return {message:`Profile Deleted Sucessfully`}
}


}