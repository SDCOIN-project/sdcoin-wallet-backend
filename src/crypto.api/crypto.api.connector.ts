import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import * as WebSocket from 'ws';
import { get } from '../utils/Api';
import * as crypto from 'crypto';
import { SUBSCRIBE_METHODS } from './crypto.api.constants';

@Injectable()
export class CryptoApiConnector {

  private readonly logger = new Logger(CryptoApiConnector.name);
  private client;
  private callback: { [key: string]: (method: any, data: any) => void } = {};

  constructor(
    private readonly configService: ConfigService,
  ) {
  }

  async connect() {
    this.client = new WebSocket(`${this.configService.get().CRYPTO_API.WS}?token=${this.configService.get().CRYPTO_API.TOKEN}`);
    return new Promise((resolve) => this.client.on('open', () => {
      // tslint:disable-next-line:no-empty
      this.subscribe(['new_block', 0], (method, data) => {});
      this.client.on('message', (data) => this.onMessage(data));
      resolve();
    }));
  }

  private async onMessage(data: string) {
    const { error, result, id, method, params } = JSON.parse(data);
    if (result === true) {
      return;
    }
    if (error) {
      this.logger.error(`onMessage error`);
      this.logger.error(error);
      return;
    }
    if (method && [SUBSCRIBE_METHODS.NEW_TRANSACTION, SUBSCRIBE_METHODS.NEW_TRANSFER].includes(method)) {
      this.logger.verbose('--- new message ---');
      this.logger.verbose(`\n${data}`);
      return this.callback[params[0]](method, params[1]);
    }
  }

  async request(path: string, data: { [key: string]: any } = {}) {
    data.token = this.configService.get().CRYPTO_API.TOKEN;
    return get(`${this.configService.get().CRYPTO_API.URL}/api/v1/coins/eth/${path}`, data);
  }

  subscribe(params: any[], cb: (method: any, data: any) => void) {
    const index = this.getID(params);
    this.callback[index] = cb;
    this.logger.verbose('--- new subscription ---');
    this.logger.verbose(`\n${JSON.stringify(params)}`);
    this.client.send(JSON.stringify({
      method: 'subscribe',
      params,
      id: index,
    }));
  }

  unsubscribe(params: any[]) {
    const index = this.getID(params);
    this.logger.verbose('--- unsubscribe ---');
    this.logger.verbose(`\n${JSON.stringify(params)}`);
    delete this.callback[index];
    this.client.send(JSON.stringify({
      method: 'unsubscribe',
      params,
      id: index,
    }));
  }

  private getID(params: any) {
    return crypto.createHash('md5').update(JSON.stringify(params)).digest('hex');
  }

}
