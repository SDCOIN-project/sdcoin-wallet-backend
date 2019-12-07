import { Injectable, Logger } from '@nestjs/common';
import { Client } from 'cryptoapi-lib';
import { ConfigService } from '../config/config.service';

@Injectable()
export class CryptoApiConnector {

  private readonly logger = new Logger(CryptoApiConnector.name);
  client;

  constructor(
    private readonly configService: ConfigService,
  ) {
  }

  async connect() {
    this.client = new Client(this.configService.get().CRYPTO_API.TOKEN, {
      eth: {
        baseUrl: `${this.configService.get().CRYPTO_API.URL}/api/v1`,
        events: {
          url: this.configService.get().CRYPTO_API.WS,
          token: this.configService.get().CRYPTO_API.TOKEN,
          ping: 0,
          pong: 0,
        },
      },
      timeout: 3000,
    });
  }

}
