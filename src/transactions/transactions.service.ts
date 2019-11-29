import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './repositories/transaction.repository';
import { CURRENCY_TYPE } from './transactions.constants';
import { ConfigService } from '../config/config.service';

@Injectable()
export class TransactionService {

  constructor(
    private readonly configService: ConfigService,
    private readonly transactionRepository: TransactionRepository) {
  }

  async getTransactions(currencyType: string, address: string, offset: number, count: number) {
    if (currencyType === CURRENCY_TYPE.ETH) {
      return this.transactionRepository.getEthTransactions(address, offset, count);
    }
    return this.transactionRepository.getTokenTransactions(address, this.configService.get().CONTRACTS[currencyType], offset, count);
  }

}
