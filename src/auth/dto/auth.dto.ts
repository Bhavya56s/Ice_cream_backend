import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Role } from "src/users/entities/user.entity";

export class LoginDto{
  @IsNotEmpty()
  @IsEmail({},{message:'Please enter correct mail'})
  email :string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password : string;

  
}

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  name:string;
 
  @IsNotEmpty()
  @IsEmail({},{message: 'Please enter correct mail'})
  email : string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role:Role;


}