import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { MongooseModule } from '@nestjs/mongoose';
import { pets,PetsSchema } from './models/location.schema';
import { LocationResolver } from './location.resolver';

@Module({
    imports: [
        MongooseModule.forFeature([{
           name: pets.name,
           schema: PetsSchema
         }]),
     
    ],
  providers: [ LocationResolver, LocationService ]
})
export class LocationModule {}
