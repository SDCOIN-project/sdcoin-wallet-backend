import { Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { ConfigModule } from './config/config.module';
import { CryptoApiModule } from './crypto.api/crypto.api.module';

@Module({
  imports: [
    TransactionsModule,
    ConfigModule,
    CryptoApiModule,
  ],
})
export class AppModule {
}
