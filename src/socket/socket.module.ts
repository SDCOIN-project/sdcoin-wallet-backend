import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { CryptoApiModule } from '../crypto.api/crypto.api.module';
import { SocketService } from './socket.service';

@Module({
  exports: [SocketGateway],
  imports: [CryptoApiModule],
  providers: [SocketGateway, SocketService],
})
export class SocketModule { }
