import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { RegisterUserInput } from './dto/register-user.input';
import { UseFilters, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoggedUserOutput } from './dto/logged-user.output';
import { LoginUserInput } from './dto/login-user.input';
import { CurrentUser } from 'src/decorators/user.decorator';
import { HttpExceptionFilter } from './http-exception.filter';
import { ICoonnectedUser } from 'src/interfaces/connected-user.interface';
import { TokenGuard } from './token.guard';
@UseFilters( new HttpExceptionFilter())
@Resolver()
export class AuthResolver {
    constructor(
      private readonly _authService: AuthService
      ) {}
    
    // @UseGuards(AccessTokenGuard)
    @Mutation(() => LoggedUserOutput)
    async registerUser(@Args('registerUserInput') registerUserInput: RegisterUserInput) {
      const tokens =  await this._authService.registerUser(registerUserInput);
      return tokens
    }
    
    @Mutation(() => LoggedUserOutput)
    async login(@Args('loginUserInput') loginUserInput:LoginUserInput) {
      const tokens =  await this._authService.login(loginUserInput);
      return tokens
    }
    @UseGuards(TokenGuard)
    @Mutation(()=>Number,{nullable:true})
    async logout (@CurrentUser() user: ICoonnectedUser) {
      const { sub:userId,token:token,exp:experationTime} = user
      const tokens =  await this._authService.insertToBlackList(userId,token, experationTime*1000);
      return tokens
    }
    @UseGuards(TokenGuard)
    @Mutation(() => LoggedUserOutput)
    async refreshTokens(@CurrentUser() user: ICoonnectedUser) {
      const {token, sub: userId} = user
      const tokens =  await this._authService.refreshTokens(userId,token);
      return tokens  
    }

}

  

  

