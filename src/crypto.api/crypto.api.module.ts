import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { CryptoApiService } from './crypto.api.service';

@Module({
  imports: [
    ConfigModule,
  ],
  exports: [CryptoApiService],
  providers: [
    CryptoApiService,
  ],
})
export class CryptoApiModule {}
