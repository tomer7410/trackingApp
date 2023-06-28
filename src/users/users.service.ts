import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { HashService } from './hash/hash.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private hashService: HashService){
  
  }

  async getUserByUsername(username: string) {
    return this.userModel.findOne({
        username
      })
      .exec();
  }

  async registerUser(createUserInput: CreateUserInput) {
    const createUser = new this.userModel(createUserInput)
    const user = await this.getUserByUsername(createUser.username);
    if (user) {
      throw new BadRequestException();
    }
    // Hash Password
    createUser.password = await this.hashService.hashPassword(createUser.password);

    return createUser.save();
  }

  findAll() {
    return this.userModel.find()
  }

  findOne(id: string) {
    return this.userModel.findById(id)
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id:new Types.ObjectId(id)})
  }
}
