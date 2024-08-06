import {  Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { classToPlain } from "class-transformer";
import { Profiles, Role } from "src/profile/entities/profile.entity";
import { UpdateUserDto } from "./dto/admin.dto";

@Injectable()

export class AdminService {
  constructor(
    @InjectRepository(Profiles)
    private profileRepository:Repository<Profiles>
  ){}

  async findall():Promise<any>{
    return this.profileRepository.find({where:{role:Role.USER}})
  }

  async findById(id:number):Promise<any>{

    const profile = await this.profileRepository.findOne({where:{id}})

    if(!profile){
      throw new NotFoundException(`User with ${id} not found`)
    }
   
    return classToPlain(profile);
  }
  async remove(id:any):Promise<{message:string}>{
    const profile = await this.profileRepository.findOne({where:{id}})

    if(!profile){
      throw new NotFoundException(`User with ${id} not found`)
    }
    if(profile.role === 'super admin'|| profile.role === 'admin'){
      throw new NotFoundException(`You cannot delete this profile`)
    }
    const profiles = await this.profileRepository.delete(id)
    if(profiles.affected===0){
      throw new NotFoundException(`User with ID ${id} not found`)
    }
  
    return {message:`Deleted succesfully`}
  }
  
  async updateInfo(id:number,updateUserDto:UpdateUserDto){
    
    const find = await this.profileRepository.findOne({where:{id}})
    if(!find){
      throw new NotFoundException(`No data found`)
    }
    if(find.role === 'super admin'|| find.role === 'admin'){
      throw new NotFoundException(`You cannot update this profile`)
    }
    const updated = await this.profileRepository.update(id,updateUserDto)
    if(!updated){
      throw new NotFoundException(`Data cant be updated`)
    }
  }
  

}