import {
    UsersService
  } from '../users/users.service';
  import {
    BadRequestException,
    ForbiddenException,
    Inject,
    Injectable
  } from '@nestjs/common';
  import {
    JwtService
  } from '@nestjs/jwt';
  import {
    HashService
  } from '../hash/hash.service';
import { RegisterUserInput } from './dto/register-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { jwtConstants } from './constants';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ICoonnectedUser } from 'src/interfaces/connected-user.interface';
  @Injectable()
  export class AuthService {
    constructor(private usersService: UsersService,
      private hashService: HashService,
      private jwtService: JwtService,
      @Inject(CACHE_MANAGER) private cacheService: Cache) {}
  
    async validateUser(username: string, pass: string): Promise < any > {
      const user = await this.usersService.findByUsername(username);
      if (user && (await this.hashService.comparePassword(pass, user.password))) {
        return user;
      }
      return null;
    }
    async registerUser(createUserDto: RegisterUserInput): Promise<any> {
      this.cacheService.set('token',123,{ttl:1})
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
        return new BadRequestException('Password is incorrect');
      const tokens = await this.getTokens(user.id, user.username);
      await this.updateRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    }
    insertToBlackList(userId: string,token: string, experationTime: number) {
      const experationDate = new Date(experationTime);
      const currentDate = new Date();
      const experationDateMill = experationDate.getTime()
      const currentDateMill = currentDate.getTime()
      const ttl = Math.round( (experationDateMill - currentDateMill) / 1000 ) // convert to seconds
      this.cacheService.set(11,token,{ttl:ttl})
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
        )
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
        return new ForbiddenException('Access Denied');
      const refreshTokenMatches = await this.hashService.validateToken(
        user.refreshToken,
        refreshToken,
      )
      if (!refreshTokenMatches) return new ForbiddenException('Access Denied');
      const tokens = await this.getTokens(user.id, user.username);
      await this.updateRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    }
    
  }