import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { CryptoApiConnector } from './crypto.api.connector';
import { Client } from 'cryptoapi-lib';

@Injectable()
export class CryptoApiService {

  client: Client;

  constructor(
    @Inject('CONNECTION') readonly connection: CryptoApiConnector,
    private readonly configService: ConfigService) {
    this.client = this.connection.client;
  }
}
