import { ObjectType, Field } from '@nestjs/graphql';
@ObjectType()
export class User {
  @Field({ nullable: false })
  username: string;
  @Field({ nullable: false })
  email: string;
  @Field({ nullable: false })
  address: string;
  @Field({ nullable: false })
  password: string;
}
