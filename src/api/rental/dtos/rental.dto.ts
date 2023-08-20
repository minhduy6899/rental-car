import { IsNotEmpty, IsUUID } from 'class-validator';

export class RentalDto {
  @IsNotEmpty()
  @IsUUID()
  carId!: string;

  @IsNotEmpty()
  @IsUUID()
  supplierId!: string;

  @IsNotEmpty()
  @IsUUID()
  clientId!: string;

  @IsNotEmpty()
  @IsUUID()
  startTime!: string;

  @IsNotEmpty()
  @IsUUID()
  endTime!: string;
}
