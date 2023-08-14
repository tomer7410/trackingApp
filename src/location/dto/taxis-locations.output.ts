import { ObjectType, Field, Int } from "@nestjs/graphql";
import {ObjectId} from 'mongodb';

@ObjectType()
export class Location {
    @Field(() => [String, String], { description: 'The coordinates of the taxi' })
    coordinates: [String, String];
    @Field(() => String, { description: 'The location latitude of the taxi' })
    type: string;
  }

@ObjectType()
export class TaxiOutputType {
    @Field(() => Location, { description: 'The location  of the taxi' })
    location: Location;
    @Field(() => String, { description: 'The Taxi`s id' })
    _id: ObjectId
  }
