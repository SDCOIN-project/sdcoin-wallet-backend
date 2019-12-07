import { Module } from '@nestjs/common';
import { TransactionService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { ConfigModule } from '../config/config.module';
import { CryptoApiModule } from '../crypto.api/crypto.api.module';
import { Web3Service } from './web3.service';

@Module({
  imports: [
    ConfigModule,
    CryptoApiModule,
  ],
  exports: [TransactionService],
  controllers: [TransactionsController],
  providers: [
    Web3Service,
    TransactionService,
  ],
})
export class TransactionsModule {}
