import { Injectable, Logger } from '@nestjs/common';
import { CryptoApiService } from '../crypto.api/crypto.api.service';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {

  private subscribedAddresses: {[key: string]: string[]} = {};
  private subscribedAddressById: {[key: string]: string} = {};
  private wsServer: Server;
  private logger: Logger = new Logger('SocketService');

  constructor(private readonly cryptoApiService: CryptoApiService) {
  }

  set server(server) {
    this.wsServer = server;
  }

  async subscribeToAddress(id: string, address: string) {

    if (this.subscribedAddressById[id]) {
      await this.unsubscribeId(id);
    }

    if (!this.subscribedAddresses[address]) {
      this.subscribedAddresses[address] = [];
    }

    this.subscribedAddresses[address].push(id);
    this.subscribedAddressById[id] = address;

    if (this.subscribedAddresses[address].length > 1) {
      return;
    }

    await this.cryptoApiService.subscribeToNewTransactions(address, (method, data) => this.emitEvents(method, data, address));
  }

  async unsubscribeId(id: string) {
    const address = this.subscribedAddressById[id];
    delete this.subscribedAddressById[id];
    this.subscribedAddresses[address] = this.subscribedAddresses[address].filter((elem) => elem.toString() !== id.toString());
    if (this.subscribedAddresses[address].length > 0) {
      return;
    }
    await this.cryptoApiService.unsubscribeFromNewTransactions(address);
  }

  private async emitEvents(method, data, address) {
    this.wsServer.in(address).emit(method, data);
  }

}
