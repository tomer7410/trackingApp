import { Field, Float, InputType, Int,} from '@nestjs/graphql';

@InputType()
export class UserLocationsInput {
  @Field(() => Float, { description: 'The location longitude of the user' })
  longitude: number;
  @Field(() => Float, { description: 'The location latitude of the user' })
  latitude: number;
  @Field(() => Int, { description: 'The radius to seek taxis in' })
  radius: number;
}