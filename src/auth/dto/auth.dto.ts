import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Role } from "src/users/entities/user.entity";

export class LoginDto{

  @ApiProperty({
    description:"The email of the user or admin",
    
  })
  @IsNotEmpty()
  @IsEmail({},{message:'Please enter correct mail'})
  email :string;


  @ApiProperty({
    description:"The password of the user or admin",
    
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password : string;

  
}

export class SignupDto {

  @ApiProperty({
    description:"The name of the user or admin",
    
  })
  @IsNotEmpty()
  @IsString()
  name:string;
 
  @ApiProperty({
    description:"The email of the user or admin",
    
  })
  @IsNotEmpty()
  @IsEmail({},{message: 'Please enter correct mail'})
  email : string

  @ApiProperty({
    description:"The password of the user or admin",
    
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description:"The role of the user or admin",
    
  })
  @IsNotEmpty()
  @IsEnum(Role)
  role:Role;


}