import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoggedUserOutput {
  @Field(() => String, { description: 'Generated access_token of the user' })
  accessToken: string;
  @Field(() => String, { description: 'Generated refresh_token of the user' })
  refreshToken: string;

}