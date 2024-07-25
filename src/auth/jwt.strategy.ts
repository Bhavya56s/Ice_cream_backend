import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import {ExtractJwt, Strategy} from 'passport-jwt'
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy){

  constructor(
    @InjectRepository(User)
    private userRepositry: Repository<User>
  ){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey : process.env.JWT_SECRET,
    });
  }

  async validate(payload:any){
    const {id} = payload;

    const user = await this.userRepositry.findOne({where:{id}});

    if(!User){
      throw new UnauthorizedException('Login first to access this endpoint.');
}  
return user;
}

}