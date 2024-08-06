import {  Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoginDto, SignupDto } from "./dto/auth.dto";
import * as bcrypt from 'bcryptjs';
import { Profiles } from "src/profile/entities/profile.entity";

@Injectable()

export class AuthService {
  constructor(
    @InjectRepository(Profiles)
    private profileRepository:Repository<Profiles>,
    private jwtService : JwtService,
  ){}

  async signUp(signupDto:SignupDto):Promise<{message : string,token:string}>{

    const {name,email,password,role} = signupDto;

    const hashedPassword = await bcrypt.hash(password,10);

    const profile = this.profileRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    })

    await this.profileRepository.save(profile);

    const token = this.jwtService.sign({id : profile.id,role: profile.role})
    return {
    message : `${role} succesfully registered`, 
    token
    };
  }

  async login(loginDto: LoginDto):Promise<{message : string, token : string}>{

    const {email,password} = loginDto;
     
    const profile = await this.profileRepository.findOne({where:{email}})

    if(!profile){
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password,profile.password);

    if(!isPasswordMatched){
      throw new UnauthorizedException('Invalid Email or password')
    }

    const token = this.jwtService.sign({id:profile.id,role:profile.role});
    return {
      message:`${profile.role} succesfully login`,
      token,
    }
  }
}

