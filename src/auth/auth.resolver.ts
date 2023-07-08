import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { RegisterUserInput } from './dto/register-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoggedUserOutput } from './dto/logged-user.output';
import { LoginUserInput } from './dto/login-user.input';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { CurrentUser } from 'src/decorators/user.decorator';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

@Resolver()
export class AuthResolver {
    constructor(
      private readonly authService: AuthService
      ) {}
    
    @UseGuards(AccessTokenGuard)
    @Mutation(() => LoggedUserOutput)
    async registerUser(@Args('registerUserInput') registerUserInput: RegisterUserInput) {
      const tokens =  await this.authService.registerUser(registerUserInput);
      return tokens
    }

    @Mutation(() => LoggedUserOutput)
    async login(@Args('loginUserInput') loginUserInput:LoginUserInput) {
      const tokens =  await this.authService.login(loginUserInput);
      return tokens
    }
    @UseGuards(RefreshTokenGuard)
    @Mutation(() => LoggedUserOutput)
    async refreshTokens(@CurrentUser() user:any) {
      const {refreshToken, sub: userId} = user
      const tokens =  await this.authService.refreshTokens(userId,refreshToken);
      return tokens
    }

}

  

  

