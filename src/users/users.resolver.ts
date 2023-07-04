import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { RegisterUserInput } from './dto/register-user.input';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { LoggedUserOutput } from './dto/logged-user.output';
import { LoginUserInput } from './dto/logged-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
    ) {}
    
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
  @Mutation(() => User)
  registerUser(@Args('registerUserInput') registerUserInput: RegisterUserInput) {
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
