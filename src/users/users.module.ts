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
} from '../strategies/local/constants';
import {
  HashService
} from './hash/hash.service';
import {
  AuthService
} from 'src/auth/auth.service';
import {
  JwtStrategy
} from '../strategies/local/jwt.strategy';
import {
  LocalStrategy
} from '../strategies/local/local.strategy';
import { UsersResolver } from './users.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';

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
  providers: [UsersResolver,UsersService, HashService, AuthService, JwtStrategy, LocalStrategy],
})
export class UserModule {}