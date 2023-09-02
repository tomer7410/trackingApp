import { Resolver, Query} from '@nestjs/graphql';
import { User } from './user.schema';
import { UseGuards } from '@nestjs/common';
import { LoggedUserOutput } from '../auth/dto/logged-user.output';
import { TokenGuard } from 'src/auth/token.guard';
import { CurrentUser } from 'src/decorators/user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    ) {}
  @Query(() => LoggedUserOutput )
  @UseGuards(TokenGuard)
  sayHello(@CurrentUser() user:any): string {
    return 'Hello World!';
  }
 
}
