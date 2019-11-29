import { Injectable } from '@nestjs/common';
import { CryptoApiService } from '../../crypto.api/crypto.api.service';

@Injectable()
export class TransactionRepository {

  constructor(private readonly cryptoApiService: CryptoApiService) {
  }

  async getEthTransactions(address: string, skip: number, limit: number) {
    return this.cryptoApiService.getEthTransactions(address, skip, limit);
  }

  async getTokenTransactions(address: string, token: string, skip: number, limit: number) {
    return this.cryptoApiService.getTokenTransactions(address, token, skip, limit);
  }

}
