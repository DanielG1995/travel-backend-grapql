import { Injectable } from '@nestjs/common';
import { UpdateTripInput } from './dto/inputs/update-trip.input';
import { CreateTripInput } from './dto/inputs/create-trip.input';
import { Trip } from './entity/trip.entity';
import { StatusArgs } from './dto/args/status-args';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ERROR_MESSAGE_NOTFOUND } from 'src/constants';

@Injectable()
export class TripService {

    constructor(
        @InjectRepository(Trip)
        private readonly tripRepository: Repository<Trip>
    ) { }


    findAll(statusArgs: StatusArgs): Promise<Trip[]> {
        return this.tripRepository.find();
    }

    findOne(id: string): Promise<Trip> {
        const trip = this.tripRepository.findOneBy({ id })
        if (!trip) throw new Error(ERROR_MESSAGE_NOTFOUND.replace('{id}', id));

        return trip
    }


    async create(createTripInput: CreateTripInput): Promise<Trip> {

        const newTrip = this.tripRepository.create(createTripInput)

        return await this.tripRepository.save(newTrip);
    }


    async update(updateTripInput: UpdateTripInput): Promise<Trip> {
        const trip = await this.tripRepository.preload(updateTripInput)
        if (!trip) throw new Error(ERROR_MESSAGE_NOTFOUND.replace('{id}', updateTripInput.id));
        return this.tripRepository.save(trip);
    }

    async delete(id: string): Promise<Trip> {

        const trip = await this.tripRepository.findOneBy({ id })
        await this.tripRepository.remove(trip);
        if (!trip) throw new Error(ERROR_MESSAGE_NOTFOUND.replace('{id}', id));

        return { ...trip, id }
    }



}
