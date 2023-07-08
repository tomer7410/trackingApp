import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserInput } from '../auth/dto/register-user.input';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types } from 'mongoose'
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
    ){
  
  }

  async findByUsername(username: string) {
    return this.userModel.findOne({
        username
      })
      .exec();
  }

  async createUser(createUserInput: RegisterUserInput) {
    const createUser = new this.userModel(createUserInput)
    const user = await this.findByUsername(createUser.username);
    if (user) {
      throw new BadRequestException();
    }
    return createUser.save();
  }
  async update(
    id: string,
    updateUserDto: any,
  ): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }
  findAll() {
    return this.userModel.find()
  }

  findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id:new Types.ObjectId(id)})
  }
}
