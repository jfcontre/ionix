import { Controller, Post, Body, HttpException, UsePipes, ValidationPipe, } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SignInCredentialsDto } from '../dto/sign-in-credentials.dto';

@ApiTags('Auth')
@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
  * Allows to login to the app 
  * @param authCredentialsDto  The information to login
  * @returns A token and user
  */
  @Post('/login')
  @ApiOperation({ summary: 'Login to the app' })
  async signIn(
    @Body() authCredentialsDto: SignInCredentialsDto,
  ) {
    const result = await this.authService.signIn(authCredentialsDto);
    if (!result.status) {
      throw new HttpException(result.message, result.code)
    }
    return result.data
  }

}
