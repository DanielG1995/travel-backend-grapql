import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ParseUUIDPipe } from '@nestjs/common'
import { StatusArgs } from './dto/args/status-args';
import { CreateTripInput } from './dto/inputs/create-trip.input';
import { UpdateTripInput } from './dto/inputs/update-trip.input';
import { Trip } from './entity/trip.entity';
import { TripService } from './trip.service';
import { AgregationTypes } from './types/agregations.type';

@Resolver()
export class TripResolver {

    constructor(
        private readonly tripService: TripService
    ) { }
    @Query(() => [Trip], { name: 'trips' })
    findAll(
        @Args() statusArgs: StatusArgs
    ): Promise<Trip[]> {
        return this.tripService.findAll(statusArgs)
    }

    @Query(() => Trip, { name: 'trip' })
    findOne(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string): Promise<Trip> {
        return this.tripService.findOne(id);
    }

    @Mutation(() => Trip, { name: 'createTrip' })
    create(@Args('createTripInput') createTripInput: CreateTripInput): Promise<Trip> {
        return this.tripService.create(createTripInput)
    }

    @Mutation(() => Trip, { name: 'updateTrip' })
    update(@Args('updateTripInput') updateTripInput: UpdateTripInput) {
        return this.tripService.update(updateTripInput)
    }

    @Query(() => Boolean, { name: 'deleteTrip' })
    delete(@Args('id', { type: () => ID }) id: string): Promise<Trip> {
        return this.tripService.delete(id);
    }

   

}
