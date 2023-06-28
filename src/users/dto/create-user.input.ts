import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ nullable: false })
  username: string;
  @Field({ nullable: false })
  email: string;
  @Field({ nullable: false })
  address: string;
  @Field({ nullable: false })
  password: string;
}
