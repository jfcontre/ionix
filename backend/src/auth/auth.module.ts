import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService, RefreshTokenStrategy],
  exports: [AuthService, JwtStrategy, PassportModule],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: '24h'
      },
    }),
  ]

})
export class AuthModule { }
