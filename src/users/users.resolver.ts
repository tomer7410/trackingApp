import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

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

  @UseGuards(AuthGuard('jwt'))
  @Query(() => User, { name: 'user' })
  findOne(@Args('username') username: string){
    return this.usersService.getUserByUsername(username);
  }

  @Mutation(() => User)
  registerUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.registerUser(createUserInput);
  }

  @Mutation(() => User)
  login(@Args('createUserInput') email: string, password: string) {
    return this.authService.login({email,password});
  }

 
}
