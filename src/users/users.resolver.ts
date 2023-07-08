import { Resolver, Query} from '@nestjs/graphql';
import { User } from './user.schema';
import { UseGuards } from '@nestjs/common';
import { LoggedUserOutput } from '../auth/dto/logged-user.output';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { CurrentUser } from 'src/decorators/user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    ) {}
  @Query(() => LoggedUserOutput )
  @UseGuards(AccessTokenGuard)
  sayHello(@CurrentUser() user:any): string {
    return 'Hello World!';
  }
 
}
