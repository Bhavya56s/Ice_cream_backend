import {  Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {  Profiles} from "./entities/profile.entity";
import { Repository } from "typeorm";
import { classToPlain } from "class-transformer";
import { UpdateProfileDto } from "./dto/profile.dto";

@Injectable()

export class ProfileService {
  constructor(
    @InjectRepository(Profiles)
    private profileRepository:Repository<Profiles>
  ){}

  async findall():Promise<any>{
    return this.profileRepository.find()
  }

  async findById(id:number):Promise<any>{

    const profile = await this.profileRepository.findOne({where:{id}})

    if(!profile){
      throw new NotFoundException(`User with ${id} not found`)
    }
    return classToPlain(profile);
  }
  async remove(id:any):Promise<{message:string}>{
    const profile = await this.profileRepository.delete(id)
    if(profile.affected===0){
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return {message:`Deleted succesfully`}
  }
  
  async updateProfile(id:number,updateUserDto:UpdateProfileDto){}
  

}