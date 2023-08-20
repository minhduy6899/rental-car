import { RentalController } from '@app/api/rental/controllers/rental.controller';
import { Rental } from '@app/api/rental/models/rental.model';
import { RentalService } from '@app/api/rental/services/rental.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Rental])],
  controllers: [RentalController],
  providers: [RentalService],
})
export class RentalModule {}
