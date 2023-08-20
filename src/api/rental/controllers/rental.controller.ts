import { RentalDto } from '@app/api/rental/dtos/rental.dto';
import { Rental } from '@app/api/rental/models/rental.model';
import { RentalService } from '@app/api/rental/services/rental.service';
import { Roles } from '@app/common/decorators/roles.decorator';
import { AuthenticateGuard } from '@app/common/guards/authenticate.guard';
import { AuthorizeGuard } from '@app/common/guards/authorize.guard';
import { uuidRegex } from '@app/common/utils/uuid-regex.util';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';

@ApiTags('rental')
@ApiBearerAuth()
@Controller('rentals')
@UseGuards(AuthenticateGuard, AuthorizeGuard)
export class RentalController {
  constructor(
    private readonly rentalService: RentalService,
    private readonly configService: ConfigService,
  ) {}

  @ApiQuery({ name: 'page', example: 1, required: false })
  @ApiQuery({ name: 'limit', example: 10, required: false })
  @Get()
  // @Roles('admin')
  async index(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<Rental>> {
    return this.rentalService.getRentals({
      page: Number(page),
      limit: Number(limit),
      route: `${this.configService.get('APP_BASE_URL')}/rentals`,
    });
  }

  @ApiNotFoundResponse({ description: 'Not found exception response.' })
  @Get(`:id(${uuidRegex})`)
  // @Roles('admin')
  async show(@Param('id') id: string): Promise<Rental> {
    const rental = await this.rentalService.getRentalByIdWithRelationship(id);
    if (!rental) throw new NotFoundException('Car not found');
    return rental;
  }

  @ApiBadRequestResponse({ description: 'Request body validation errors.' })
  @Post()
  // @Roles('admin')
  async store(@Body() rentalDto: RentalDto): Promise<Rental> {
    return this.rentalService.insertRental(rentalDto);
  }

  @ApiBadRequestResponse({ description: 'Request body validation errors.' })
  @ApiNotFoundResponse({ description: 'Not found exception response.' })
  @Put(`:id(${uuidRegex})`)
  // @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() rentalDto: RentalDto,
  ): Promise<Rental & RentalDto> {
    const rental = await this.rentalService.getRentalById(id);
    if (!rental) throw new NotFoundException('Car not found');

    await this.rentalService.updateRental(id, rentalDto);

    return { ...rental, ...rentalDto };
  }

  @ApiNoContentResponse({ description: 'No content http response.' })
  @ApiNotFoundResponse({ description: 'Not found exception response.' })
  @Delete(`:id(${uuidRegex})`)
  @Roles('admin')
  @HttpCode(204)
  async destroy(@Param('id') id: string): Promise<void> {
    const car = await this.rentalService.getRentalById(id);
    if (!car) throw new NotFoundException('Car not found');

    await this.rentalService.deleteCar(id);
  }
}
