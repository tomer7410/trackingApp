import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoggedUserOutput } from './dto/logged-user.output';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/decorators/user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
    ) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => LoggedUserOutput )
  sayHello(@CurrentUser() user:any): string {
    return 'Hello World!';
  }
 
}
