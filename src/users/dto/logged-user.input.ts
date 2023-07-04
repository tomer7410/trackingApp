import { InputType, Field} from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  @Field(() => String, { description: 'User username ' })
  username: string;
  @Field(() => String, { description: 'password of the user' })
  password: string;
}
