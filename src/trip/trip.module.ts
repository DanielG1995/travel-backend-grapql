import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './entity/trip.entity';
import { TripResolver } from './trip.resolver';
import { TripService } from './trip.service';

@Module({
  providers: [TripResolver, TripService],
  imports: [TypeOrmModule.forFeature([Trip])]
})
export class TripModule { }
      