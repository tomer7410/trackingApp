import {
    Module
  } from '@nestjs/common';
  import {
    AuthService
  } from './auth.service';
  import {
    JwtModule, 
  } from '@nestjs/jwt';
  import {
    jwtConstants
  } from './constants';
  import {
    UsersService
  } from 'src/users/users.service';
  import {
    HashService
  } from 'src/hash/hash.service';
import { AuthResolver } from './auth.resolver';
import { AccessTokenStrategy } from 'src/auth/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from 'src/auth/strategies/refreshToken.strategy';
import { UserModule } from 'src/users/users.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
  
  @Module({
    imports: [
      ClientsModule.register([
        {
          name: 'MATH_SERVICE',
          transport: Transport.REDIS,
          options: {
            host: 'localhost',
            port: 6379,
          },
        },
      ]),
     JwtModule.register({}),
     UserModule
    ],
    providers: [AuthResolver, AuthService, HashService, AccessTokenStrategy, RefreshTokenStrategy],
  })
  export class AuthModule {}