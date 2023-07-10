import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { HashService } from '../hash/hash.service';
import { JwtModule } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let mockedUsersService = 
  { 
    findByUsername: jest.fn().mockResolvedValue(false),
    findById: jest.fn().mockResolvedValue({refreshToken:true}),
    createUser: jest.fn().mockResolvedValue({}),
  };
  let mockedHashService = { 
    hashPassword: jest.fn().mockResolvedValue("deftfdvsdc"),
    comparePassword: jest.fn().mockResolvedValue(true),
    validateToken: jest.fn().mockResolvedValue(true)
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        JwtModule.register({}),
      ],
      providers: [AuthService, 
        {
          provide: UsersService,
          useValue: mockedUsersService
        },
        {
          provide: HashService,
          useValue: mockedHashService
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    service.getTokens = jest.fn().mockResolvedValue({
      accessToken:'fverg',
      refreshToken: 'fewfrf'
    })
    service.updateRefreshToken = jest.fn().mockResolvedValue({})
  });
  
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registration testing',()=>{

    it('should return tokens', async ()=> {

      const tokens = await service.registerUser({email:'r@a.com',username:'tom',password:'12345'})
      expect(tokens).toHaveProperty(['refreshToken'])
      expect(tokens).toHaveProperty(['accessToken'])

    })
    it('should throw exception', async ()=> {
      mockedUsersService.findByUsername = jest.fn().mockResolvedValue(true)
      try {
        await service.registerUser({email:'r@a.com',username:'tom',password:'12345'})
      } catch (error) {
         expect(error).toBeInstanceOf(BadRequestException)
      }
      
    })
    
  })

  describe('login testing',()=>{
    
    it('should return tokens', async ()=> {
      mockedUsersService.findByUsername = jest.fn().mockResolvedValue(true)
      const tokens = await service.login({username:'tom',password:'12345'})
      expect(tokens).toHaveProperty(['refreshToken'])
      expect(tokens).toHaveProperty(['accessToken'])
    })
    it('should throw unmatched password exception', async ()=> {
      try {
        await service.login({username:'tom',password:'12'})
      } catch (error) {
         expect(error.message).toMatch('Password is incorrect')
      }
      
    })

    it('should throw user not found exception', async ()=> {
      mockedUsersService.findByUsername = jest.fn().mockResolvedValue(false)
      try {
        await service.login({username:'tom',password:'12'})
      } catch (error) {
         expect(error.message).toMatch('User does not exist')
      }
      
    })
    
  })

  describe('refresh Tokens testing',()=>{
    it('should return tokens', async ()=> {
     
      const tokens = await service.refreshTokens('userID','refreshToken')
      expect(tokens).toHaveProperty(['refreshToken'])
      expect(tokens).toHaveProperty(['accessToken'])
    })
    it('should throw access denied exception 1', async ()=> {
      mockedUsersService.findById = jest.fn().mockResolvedValueOnce({})
      try {
        await service.refreshTokens('userID','refreshToken')
      } catch (error) {
         expect(error.message).toMatch('Access Denied')
      }
      
    })
    it('should throw access denied exception 2', async ()=> {
      mockedUsersService.findById = jest.fn().mockResolvedValueOnce({refreshToken:{}})
      try {
        await service.refreshTokens('userID','refreshToken')
      } catch (error) {
         expect(error.message).toMatch('Access Denied')
      }
      
    })
  })


});
