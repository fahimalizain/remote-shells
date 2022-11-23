import {
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto';
import { JwtAuthGuard, Public } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  profile(@Request() req) {
    return req.user;
  }

  @Public()
  @Post('signup')
  signup(@Body() data: SignupDTO) {
    return this.authService.signup(data);
  }
}
