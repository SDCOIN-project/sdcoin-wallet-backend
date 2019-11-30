import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { CryptoApiService } from './crypto.api.service';
import { ConfigService } from '../config/config.service';
import { CryptoApiConnector } from './crypto.api.connector';

const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: async (configService: ConfigService) => {
    const connector = new CryptoApiConnector(configService);
    await connector.connect();
    return connector;
  },
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule,
  ],
  exports: [CryptoApiService],
  providers: [
    connectionFactory,
    CryptoApiService,
  ],
})
export class CryptoApiModule {}
