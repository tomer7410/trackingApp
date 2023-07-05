import {
  Module
} from '@nestjs/common';
import {
  UsersService
} from './users.service'; 

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
} from '../auth/constants';
import {
  HashService
} from './hash/hash.service';
import {
  AuthService
} from 'src/auth/auth.service';
import {
  JwtStrategy
} from '../auth/jwt.strategy';
import { UsersResolver } from './users.resolver';

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
  providers: [UsersResolver,UsersService, HashService, AuthService, JwtStrategy],
})
export class UserModule {}