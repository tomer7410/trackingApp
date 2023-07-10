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
import { UsersResolver } from './users.resolver';

@Module({
  imports: [
   MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }]),

  ],
  providers: [UsersResolver, UsersService],
  exports:[UsersService]
})
export class UserModule {}