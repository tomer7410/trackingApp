import { Resolver, Query, Args} from '@nestjs/graphql';
import { UserLocationsInput } from './dto/user-locations.input';
import { TaxiOutputType } from './dto/taxis-locations.output';
import { LocationService } from './location.service';
import { pets } from './models/location.schema';

@Resolver(()=>pets  )
export class LocationResolver {
  constructor(private readonly _locationService:LocationService ) {}
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
  @Query(() => [TaxiOutputType])
  async getTaxisLocations(@Args('userLocationsInput') userLocationsInput: UserLocationsInput) {
    const taxis =  await this._locationService.findTaxisWithinRaduis(userLocationsInput);
    return taxis
  }
 
}
