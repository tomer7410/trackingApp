import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;
@Schema()
@ObjectType()
export class User {
  @Field(() => String)
  id: string;
  @Prop()
  @Field(() => String, { description: 'User username ' })
  username: string;
  @Prop()
  @Field(() => String, { description: 'User email ' })
  email: string;
  @Prop()
  password: string;
	@Prop()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);