import { Controller, Post, Body, HttpException, UsePipes, ValidationPipe, UseGuards, HttpCode, } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SignInCredentialsDto } from '../dto/sign-in-credentials.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { UserWithOutPassword } from '../interfaces/user-without-password.interface';
import { GetUser } from '../decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

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

  /**
* Allows to reset password
* @param authCredentialsDto  The information to login
* @returns A token and user
*/
  @Post('/reset-password')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Allows to reset password' })
  @HttpCode(200)
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @GetUser() user: UserWithOutPassword
  ) {
    const result = await this.authService.resetPassword(resetPasswordDto, user);
    if (!result.status) {
      throw new HttpException(result.message, result.code)
    }
    return {}
  }

}
