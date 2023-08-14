
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

export type PetsDocument = pets & Document;
@Schema()
export class pets {
  @Prop({
    type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
  })
  location: {
    type: string;
    coordinates: number[];
  };
  @Prop()
  _id:string
   
   
}
const PetsSchema = SchemaFactory.createForClass(pets);
PetsSchema.index({location:'2dsphere'})
export {PetsSchema}
