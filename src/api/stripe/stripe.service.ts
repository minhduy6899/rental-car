import { Rental } from '@app/api/stripe/Rental.model';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
    private stripe: any;

    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
            apiVersion: '2023-08-16'
        })
    }

    checkout(retal: Rental) {
        const totalPrice = retal.reduce((acc, item) => acc + item.quantity * item.price, 0) 
        
        return this.stripe.paymentIntents.create({
            amount: totalPrice * 100,
            currency: 'usd',
            payment_method_types: ['card']
        })
    }

}
