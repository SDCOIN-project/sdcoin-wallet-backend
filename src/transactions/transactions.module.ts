import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from '../shemas/transaction.schema';
import { TransactionService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionRepository } from './repositories/transaction.repository';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: 'transaction', schema: TransactionSchema }]),
  ],
  exports: [TransactionService, TransactionRepository],
  controllers: [TransactionsController],
  providers: [
    TransactionService,
    TransactionRepository,
  ],
})
export class TransactionsModule {}
