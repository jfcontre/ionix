import { HttpStatus, Injectable } from '@nestjs/common';
import { SignInCredentialsDto } from '../dto/sign-in-credentials.dto';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ServiceResult } from '../../common/ServiceResult';
import { JwtResponseDto } from '../dto/jw-response.dto';


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
}
