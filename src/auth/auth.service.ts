import {
    UsersService
  } from 'src/users/users.service';
  import {
    BadRequestException,
    ForbiddenException,
    Injectable
  } from '@nestjs/common';
  import {
    JwtService
  } from '@nestjs/jwt';
  import {
    HashService
  } from 'src/hash/hash.service';
import { RegisterUserInput } from 'src/auth/dto/register-user.input';
import { LoginUserInput } from 'src/auth/dto/login-user.input';
import { jwtConstants } from './constants';
  
  @Injectable()
  export class AuthService {
    constructor(private usersService: UsersService,
      private hashService: HashService,
      private jwtService: JwtService) {}
  
    async validateUser(username: string, pass: string): Promise < any > {
      const user = await this.usersService.findByUsername(username);
      if (user && (await this.hashService.comparePassword(pass, user.password))) {
        return user;
      }
      return null;
    }
    async registerUser(createUserDto: RegisterUserInput): Promise<any> {
      // Check if user exists
      const userExists = await this.usersService.findByUsername(
        createUserDto.username,
      );
      if (userExists) {
        throw new BadRequestException('User already exists');
      }
  
      // Hash password
      const hash = await this.hashService.hashPassword(createUserDto.password);
      const newUser = await this.usersService.createUser({
        ...createUserDto,
        password: hash,
      });
      const tokens = await this.getTokens(newUser.id, newUser.username);
      await this.updateRefreshToken(newUser.id, tokens.refreshToken);
      return tokens;
    }

    async login(data: LoginUserInput) {
      // Check if user exists
      const user = await this.usersService.findByUsername(data.username);
      if (!user) throw new BadRequestException('User does not exist');
      const passwordMatches = await this.hashService.comparePassword(data.password,user.password)
      if (!passwordMatches)
        throw new BadRequestException('Password is incorrect');
      const tokens = await this.getTokens(user.id, user.username);
      await this.updateRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    }
    async getTokens(userId: string, username: string) {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(
          {
            sub: userId,
            username,
            
          },
          {
            secret: jwtConstants.secret,
            expiresIn: '15m',
          },
        ),
        this.jwtService.signAsync(
          {
            sub: userId,
            username,
          },
          {
            secret: jwtConstants.secret,
            expiresIn: '7d',
          },
        ),
      ]);
  
      return {
        accessToken,
        refreshToken,
      };
    }
    async updateRefreshToken(userId: string, refreshToken: string) {
      const hashedRefreshToken = await this.hashService.hashData(refreshToken);
      await this.usersService.update(userId, {
        refreshToken: hashedRefreshToken,
      });
    }
    async refreshTokens(userId: string, refreshToken: string) {
      const user = await this.usersService.findById(userId);
      if (!user || !user.refreshToken)
        throw new ForbiddenException('Access Denied');
      const refreshTokenMatches = await this.hashService.validateToken(
        user.refreshToken,
        refreshToken,
      );
      if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
      const tokens = await this.getTokens(user.id, user.username);
      await this.updateRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    }
    
  }