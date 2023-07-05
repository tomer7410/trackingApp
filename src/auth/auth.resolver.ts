import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.schema';
import { RegisterUserInput } from '../users/dto/register-user.input';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoggedUserOutput } from '../users/dto/logged-user.output';
import { LoginUserInput } from '../users/dto/logged-user.input';
import { GqlAuthGuard } from './auth.guard';
import { CurrentUser } from '../decorators/user.decorator';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
    ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  registerUser(@Args('registerUserInput') registerUserInput: RegisterUserInput,@CurrentUser() user:any) {
    return this.usersService.registerUser(registerUserInput);
  }

  @Mutation(() => LoggedUserOutput)
  async login(@Args('loginUserInput') loginUserInput:LoginUserInput) {
    const user = await this.authService.validateUser(
      loginUserInput.username,
      loginUserInput.password,
    );
    if (!user) {
      throw new BadRequestException(`Email or password are invalid`);
    } else {
      return this.authService.generateUserCredentials(user);
    }
  }

 
}
