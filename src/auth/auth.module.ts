import {
    Module
  } from '@nestjs/common';
  import {
    AuthService
  } from './auth.service';
  import {
    MongooseModule
  } from '@nestjs/mongoose';
  import {
    User,
    UserSchema
  } from 'src/users/user.schema';
  import {
    JwtModule, JwtService
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
  
  @Module({
    imports: [
     JwtModule.register({}),
    ],
    providers: [AuthResolver,AuthService, UsersService, HashService, AccessTokenStrategy,RefreshTokenStrategy],
  })
  export class AuthModule {}