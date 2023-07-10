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
    createUser: jest.fn().mockResolvedValue({}),
  };
  let mockedHashService = { 
    hashPassword: jest.fn().mockResolvedValue("deftfdvsdc"),
    
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
  });
  
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registration testing',()=>{
    beforeEach(()=>{
      service.getTokens = jest.fn().mockResolvedValue({
        accessToken:'fverg',
        refreshToken: 'fewfrf'
      })
      service.updateRefreshToken = jest.fn().mockResolvedValue({})
    })
    it('should return tokens', async ()=> {
      
      const tokens = await service.registerUser({email:'r@a.com',username:'tom',password:'12345'})
      console.log(tokens)
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
});
