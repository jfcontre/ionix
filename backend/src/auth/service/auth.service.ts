import { HttpStatus, Injectable } from '@nestjs/common';
import { SignInCredentialsDto } from '../dto/sign-in-credentials.dto';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ServiceResult } from '../../common/ServiceResult';
import { JwtResponseDto } from '../dto/jw-response.dto';
import { UserWithOutPassword } from '../interfaces/user-without-password.interface';
import { ResetPasswordDto } from '../dto/reset-password.dto';


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  /**
 * Login with the app
 * @returns a token and username
 */
  async signIn(
    authCredentialsDto: SignInCredentialsDto,
  ): Promise<ServiceResult<JwtResponseDto>> {
    const result = new ServiceResult<JwtResponseDto>()
    const { username, password } = authCredentialsDto;
    const user = await this.prisma.users.findFirst({ where: { username } });


    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...userWithOutPassword } = user;
      const payload: JwtPayload = { user: userWithOutPassword };
      const accessToken: string = await this.jwtService.signAsync(payload);

      var data: JwtResponseDto = {
        accessToken,
        username: user.username,
      }

      result.data = data
      result.status = true
      return result
    } else {
      result.code = HttpStatus.BAD_REQUEST
      result.message = "Credentials are incorrect"
      return result
    }
  }

  /**
  * Reset password for a user
  * @param resetPasswordDto The reset password information
  * @param user The user logged 
  * @returns a result indicating success or failure
  */
  async resetPassword(resetPasswordDto: ResetPasswordDto, user: UserWithOutPassword): Promise<ServiceResult<void>> {
    const result = new ServiceResult<void>();

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(resetPasswordDto.password, salt);

    await this.prisma.users.update({
      where: { username: user.username },
      data: { password: hashedPassword },
    });

    result.status = true;
    result.message = "Password reset successfully";


    return result;
  }
}
