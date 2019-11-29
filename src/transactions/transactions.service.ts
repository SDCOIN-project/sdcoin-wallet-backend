import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './repositories/transaction.repository';
import * as config from 'config';
import { CURRENCY_TYPE } from './transactions.constants';

@Injectable()
export class TransactionService {

  constructor(
    private readonly transactionRepository: TransactionRepository) {
  }

  async getTransactions(currencyType: string, address: string, offset: number, count: number) {
    if (currencyType === CURRENCY_TYPE.ETH) {
      return this.transactionRepository.getEthTransactions(address, offset, count);
    }
    return this.transactionRepository.getTokenTransactions(address, config.CONTRACTS[currencyType], offset, count);
  }

}
