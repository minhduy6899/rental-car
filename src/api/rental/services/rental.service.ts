import { RentalDto } from '@app/api/rental/dtos/rental.dto';
import { Rental } from '@app/api/rental/models/rental.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
  ) {}

  getRentals(paginationOptions: IPaginationOptions): Promise<Pagination<Rental>> {
    return paginate(this.rentalRepository, paginationOptions, {
      relations: ['car', 'supplier', 'client'],
    });
  }

  getRentalById(id: string): Promise<Rental | undefined> {
    return this.rentalRepository.findOne(id);
  }

  getRentalByIdWithRelationship(id: string): Promise<Rental | undefined> {
    return this.rentalRepository.findOne(id, {
      relations: ['car', 'supplier', 'client'],
    });
  }

  insertRental({ carId, supplierId, clientId, startTime, endTime }: RentalDto): Promise<Rental> {
    return this.rentalRepository.save({
      car: { id: carId },
      supplier: { id: supplierId },
      client: { id: clientId },
      startTime: startTime,
      endTime: endTime
    });
  }

  updateRental(
    id: string,
    { carId, supplierId, clientId, startTime, endTime }: RentalDto,
  ): Promise<UpdateResult> {
    return this.rentalRepository.update(id, {
      car: { id: carId },
      supplier: { id: supplierId },
      client: { id: clientId },
      startTime: startTime,
      endTime: endTime
    });
  }

  deleteCar(id: string): Promise<DeleteResult> {
    return this.rentalRepository.delete(id);
  }
}
