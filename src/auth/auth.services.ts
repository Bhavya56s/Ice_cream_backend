import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { LoginDto, SignupDto } from "./dto/auth.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()

export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository:Repository<User>,
    private jwtService : JwtService,
  ){}

  async signUp(signupDto:SignupDto):Promise<{message : string,token:string}>{

    const {name,email,password,role} = signupDto;

    const hashedPassword = await bcrypt.hash(password,10);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    })

    await this.userRepository.save(user);

    const token = this.jwtService.sign({id : user.id})
    return {
    message : `${role} succesfully registered`, 
    token
    };
  }

  async login(loginDto: LoginDto):Promise<{message : string, token : string}>{

    const {email,password} = loginDto;
     
    const user = await this.userRepository.findOne({where:{email}})

    if(!user){
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password,user.password);

    if(!isPasswordMatched){
      throw new UnauthorizedException('Invalid Email or password')
    }

    const token = this.jwtService.sign({id:user.id});
    return {
      message:`${user.role} succesfully login`,
      token,
    }
  }
}