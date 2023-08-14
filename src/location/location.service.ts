import { Injectable } from '@nestjs/common';
import { UserLocationsInput } from './dto/user-locations.input';
import { Model } from 'mongoose';
import {  pets } from './models/location.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LocationService {
    constructor( @InjectModel(pets.name) private _locationModel: Model<pets>){}

    findTaxisWithinRaduis(userLocationsInput: UserLocationsInput){
        return this._locationModel.find({
            location: {
                $near: {
                $geometry: {
                    type: "Point" ,
                    coordinates: [ userLocationsInput.longitude ,userLocationsInput.latitude ]
                },
                $maxDistance: userLocationsInput.radius,
                $minDistance: 0
                }
            }
        }).lean()
    }
}
