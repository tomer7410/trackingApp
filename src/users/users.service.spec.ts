import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { RegisterUserInput } from 'src/auth/dto/register-user.input';
import { BadRequestException } from '@nestjs/common';


describe('UsersService', () => {
  function mockUserModel(dto: RegisterUserInput) {
    this.data = dto;
    this.save  = () => {
      console.log(this.data);
      
      return this.data;
    };
  }
  let service: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: 
        [
          UsersService,
          { 
            provide: getModelToken(User.name), 
            useValue: mockUserModel // <-- Use the Model Class from Mongoose
          },
        ],
    }).compile();
   let a  = module.get<Model<UserDocument>>(getModelToken(User.name));
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('testing user creation',()=>{
    it('should create user successfully',async ()=>{
      service.findByUsername = jest.fn().mockResolvedValue(false)
      
      const user = await service.createUser({email:'testEmail',username:'tom',password:'123'})
      expect(user).toBeDefined()
    })

    it('should throw bad request exception',async ()=>{
      service.findByUsername = jest.fn().mockResolvedValue(true)
      service.createUser({email:'testEmail',username:'tom',password:'123'}).catch(err=>expect(err).toBeInstanceOf(BadRequestException))
      
    })
  })
});
