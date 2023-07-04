import {
    UsersService
  } from 'src/users/users.service';
  import {
    Injectable
  } from '@nestjs/common';
  import {
    JwtService
  } from '@nestjs/jwt';
  import {
    HashService
  } from 'src/users//hash/hash.service';
import { User } from 'src/users/user.schema';
  
  @Injectable()
  export class AuthService {
    constructor(private userService: UsersService,
      private hashService: HashService,
      private jwtService: JwtService) {}
  
    async validateUser(username: string, pass: string): Promise < any > {
      const user = await this.userService.getUserByUsername(username);
      if (user && (await this.hashService.comparePassword(pass, user.password))) {
        return user;
      }
      return null;
    }
  
    async generateUserCredentials(user: User) {
      const payload = {
        email: user.email,
        username: user.username,
        sub: user._id,
      };
  
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }