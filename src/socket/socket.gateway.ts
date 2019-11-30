import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger, Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import * as config from 'config';
import { SocketService } from './socket.service';

@WebSocketGateway(config.WS_PORT || 3001)
@Injectable()
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  private server: Server;
  private logger: Logger = new Logger('SocketGateway');

  constructor(
    private readonly socketService: SocketService) {
  }

  afterInit(server: Server) {
    this.logger.log(`Initialized socket connect on ${config.WS_PORT} port`);
    this.socketService.server = this.server;
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    client.emit('connection', 'Successfully connected to server');
  }

  async handleDisconnect({ id }: { id: string }) {
    this.logger.log(`Client disconnect: ${id}`);
    await this.socketService.unsubscribeId(id);
  }

  @SubscribeMessage('subscribeToAddress')
  async subscribeToAddress(socket: Socket, { address }: { address: string }) {
    address = address.toLowerCase();
    this.logger.log(`subscribeToAddress. \n  ID: ${socket.id}\n  address: ${address}`);
    socket.join(address);
    await this.socketService.subscribeToAddress(socket.id, address);
  }

}
