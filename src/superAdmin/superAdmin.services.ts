import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Profiles, Role } from "src/profile/entities/profile.entity";
import { Repository } from "typeorm";
import { CreatAdminDto, UpdateAdminDto } from "./dto/superAdmin.dto";
import * as bcrypt from 'bcryptjs';
import { classToPlain } from "class-transformer";

@Injectable()

export class SuperAdminService{
  constructor(
    @InjectRepository(Profiles)
    private profileRepository:Repository<Profiles>
  ){}

  async create(creatAdminDto:CreatAdminDto):Promise<{message:string}>{

    const {name,email,password} = creatAdminDto

    const hashedPassword= await bcrypt.hash(password,10);

    const newAdmin = this.profileRepository.create({
      name,
      email,
      password:hashedPassword,
      role:Role.ADMIN,
    })

    if(!newAdmin){
      throw new NotFoundException("Admin cannot be created")
    }

    await this.profileRepository.save(newAdmin);
    return {message:`Admin Sucesfully Created`}
  }

  async findAll():Promise<any>{
    return classToPlain(this.profileRepository.find({where:{role:Role.ADMIN}}))
  }

  async findById(id:number):Promise<any>{

    const admin= await this.profileRepository.findOne({where:{id}})
  
    if(!admin){
      throw new NotFoundException(`No,Admin is present with this ID ${id}`)
    }

    if(admin.role !== 'admin'){
      throw new NotFoundException(`This ID ${id} is not of admin`)
    }
   

    return classToPlain(admin)
  }


  async remove(id:number):Promise<{message:string}>{

    const admin =  await this.profileRepository.findOne({where:{id}})
    if(!admin){
      throw new NotFoundException(`No data found with this ${id}`)
    }

    
    if(admin.role !== 'admin'){
      throw new NotFoundException(`This ID ${id} is not of admin`)
    }
    const removed = this.profileRepository.delete(id)
    if(!removed){
      throw new NotFoundException(`Data cannot be deleted`)
    }
    return {message:`Data deleted sucesfully`}
  }

  async updateInfo(id:number,updateAdminDto:UpdateAdminDto):Promise<{message:string}>{

    const find = await this.profileRepository.findOne({where:{id}})
    if(!find){
      throw new  NotFoundException('No data found')
    }
    if(find.role !== 'admin'){
      throw new NotFoundException(`This ID ${id} is not of admin`)
    }
    const updated = this.profileRepository.update(id,updateAdminDto)
    if(!updated){
      throw new NotFoundException('Data can not be updated')
    }
    return {message:`Updations Done`}
  }

}