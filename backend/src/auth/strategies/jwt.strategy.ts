import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private prisma: PrismaService,
  ) {
    super({
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload) {
    const { user } = payload;
    const username = user.username
    const userFound = await this.prisma.users.findFirst({ where: { username } });

    if (!userFound) {
      throw new UnauthorizedException();
    }

    return userFound;
  }
}