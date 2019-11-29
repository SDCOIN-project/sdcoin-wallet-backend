import { Injectable } from '@nestjs/common';
import { get } from '../utils/Api';
import { ConfigService } from '../config/config.service';

@Injectable()
export class CryptoApiService {

  constructor(
    private readonly configService: ConfigService) {
  }

  private async request(path: string, data: { [key: string]: any } = {}) {
    // data.token = this.configService.get().CRYPTO_API.TOKEN;
    return get(`${this.configService.get().CRYPTO_API.URL}/api/v1/coins/eth/${path}`, data);
  }

  async getEthTransactions(address: string, skip: number, limit: number) {
    return this.request(`accounts/${address}/transfers`, { skip, limit });
  }

  async getTokenTransactions(address: string, token: string, skip: number, limit: number) {
    return this.request(`tokens/${token}/${address}/transfers`, { skip, limit });
  }
}
