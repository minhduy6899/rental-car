import { Rental } from '@app/api/stripe/Rental.model';
import { StripeService } from '@app/api/stripe/stripe.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('stripe')
export class StripeController {

    constructor(private stripeService: StripeService) {

    }

    @Post()
    checkout(@Body() body: { rental: Rental }) {
        try {
            return this.stripeService.checkout(body.rental)
        } catch (error) {
            return error;
        }
    }
}
