import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ITransaction } from './interfaces/transaction.interface';
import { TransactionRepository } from './repositories/transaction.repository';
import * as config from 'config';
import { CURRENCY_TYPE } from './transactions.constants';

@Injectable()
export class TransactionService {

  constructor(
    private readonly transactionRepository: TransactionRepository,
  ) {
  }

  async getTransactions(offset: number, count: number, currencyType: string, address: string) {
    if (currencyType === CURRENCY_TYPE.ETH) {
      return this.transactionRepository.getEthTransactions(offset, count, address);
    }
    return this.transactionRepository.getTokenTransactions(offset, count, config.CONTRACTS[currencyType], address);
  }

}
