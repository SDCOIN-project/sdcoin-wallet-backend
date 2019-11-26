import * as config from 'config';
import { Injectable } from '@nestjs/common';
import { get } from '../../utils/Api';

@Injectable()
export class TransactionRepository {
  async getEthTransactions(offset: number, count: number, address: string) {
    return new Promise((resolve, reject) => {
      get(`${config.CRYPTO_API_URL}/api/v1/coins/eth/accounts/${address}/transfers`, { skip: offset, limit: count }, {}).then((data) => {
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  async getTokenTransactions(offset: number, count: number, token: string, address: string) {
    return new Promise((resolve, reject) => {
      get(`${config.CRYPTO_API_URL}/api/v1/coins/eth/tokens/${token}/${address}/transfers`, { skip: offset, limit: count }, {}).then((data) => {
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
