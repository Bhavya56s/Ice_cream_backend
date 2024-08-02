import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { classToPlain } from "class-transformer";

@Injectable()

export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository:Repository<User>
  ){}

  async findall():Promise<any>{
    return this.userRepository.find()
  }

  async findById(id:number):Promise<any>{

    const user = await this.userRepository.findOne({where:{id}})

    if(!user){
      throw new NotFoundException(`User with ${id} not found`)
    }
    return classToPlain(user);
  }
  async remove(id:any):Promise<{message:string}>{
    const user = await this.userRepository.delete(id)
    if(user.affected===0){
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return {message:`Deleted succesfully`}
  }
  
  

}