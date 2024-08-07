import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { Profiles } from "./entities/profile.entity";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.services";
import { JwtStrategy } from "src/auth/jwt.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports:[ TypeOrmModule.forFeature([Profiles]),
AuthModule ],
  controllers:[ProfileController],
  providers:[ProfileService,JwtStrategy],
  exports:[TypeOrmModule,JwtStrategy]
  
})



export class ProfileModule{
  
}