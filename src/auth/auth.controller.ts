import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.services";
import { LoginDto, SignupDto } from "./dto/auth.dto";

@Controller('auth')
export class AuthController{
  constructor(private authService : AuthService) {}

  @Post('/signup')
  signUp(@Body() signupDto : SignupDto): Promise<{token :string}>{
    return this.authService.signUp(signupDto);
  }
  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

}