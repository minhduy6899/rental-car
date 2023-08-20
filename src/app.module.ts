import { ApiModule } from '@app/api/api.module';
import { CoreModule } from '@app/core/core.module';
import { Module } from '@nestjs/common';
import { StripeModule } from './api/stripe/stripe.module';

@Module({
  imports: [CoreModule, ApiModule, StripeModule],
})
export class AppModule {}
