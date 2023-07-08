import { InputType, Field} from '@nestjs/graphql';

@InputType()
export class RegisterUserInput {
  @Field(() => String, { description: 'User username ' })
  username: string;
  @Field(() => String, { description: 'email of the user' })
  email: string;
  @Field(() => String, { description: 'password of the user' })
  password: string;
}
