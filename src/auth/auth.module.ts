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
    JwtModule
  } from '@nestjs/jwt';
  import {
    jwtConstants
  } from './constants';
  import {
    UsersService
  } from 'src/users/users.service';
  import {
    HashService
  } from 'src/users//hash/hash.service';
import { AuthResolver } from './auth.resolver';
  
  @Module({
    imports: [
     MongooseModule.forFeature([{
        name: User.name,
        schema: UserSchema
      }]),
     JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {
          expiresIn: '60d'
        },
      }),
    ],
    providers: [AuthResolver,AuthService, UsersService, HashService],
  })
  export class AuthModule {}