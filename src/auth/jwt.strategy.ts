import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Profiles } from 'src/profile/entities/profile.entity';
import { Repository } from 'typeorm';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Profiles)
    private profileRepository:Repository<Profiles>,) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, 
    });
  }

  async validate(payload: any): Promise<Profiles> {
    const { email } = payload; 
    const profile = await this.profileRepository.findOne({ where: { email } });

    if (!profile) {
      throw new UnauthorizedException();
    }
    profile['role'] = payload.role;

    return profile;
  }
}
