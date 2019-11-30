import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { CryptoApiConnector } from './crypto.api.connector';
import { SUBSCRIBE_METHODS } from './crypto.api.constants';

@Injectable()
export class CryptoApiService {

  constructor(
    @Inject('CONNECTION') private readonly connection: CryptoApiConnector,
    private readonly configService: ConfigService) {
  }

  async getEthTransactions(address: string, skip: number, limit: number) {
    return this.connection.request(`accounts/${address}/transfers`, { skip, limit });
  }

  async getTokenTransactions(address: string, token: string, skip: number, limit: number) {
    return this.connection.request(`tokens/${token}/${address}/transfers`, { skip, limit });
  }

  async subscribeToNewTransactions(address: string, cb: (method, data) => void) {
    this.connection.subscribe([SUBSCRIBE_METHODS.NEW_TRANSACTION, address, 0], cb);
    this.connection.subscribe([SUBSCRIBE_METHODS.NEW_TRANSFER, this.configService.get().CONTRACTS.LUV, address, 0], cb);
    this.connection.subscribe([SUBSCRIBE_METHODS.NEW_TRANSFER, this.configService.get().CONTRACTS.SDC, address, 0], cb);
  }

  async unsubscribeFromNewTransactions(address: string) {
    this.connection.unsubscribe([SUBSCRIBE_METHODS.NEW_TRANSACTION, address, 0]);
    this.connection.unsubscribe([SUBSCRIBE_METHODS.NEW_TRANSACTION, this.configService.get().CONTRACTS.LUV, address, 0]);
    this.connection.unsubscribe([SUBSCRIBE_METHODS.NEW_TRANSACTION, this.configService.get().CONTRACTS.SDC, address, 0]);
  }

}
