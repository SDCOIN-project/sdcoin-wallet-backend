import { Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleCheckModule } from './schedule/schedule.check.module';
import { CryptoApiModule } from './crypto.api/crypto.api.module';

@Module({
  imports: [
    TransactionsModule,
    ConfigModule,
    ScheduleCheckModule,
    CryptoApiModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `${configService.get().MONGODB_URI}${configService.get().MONGODB_DATABASE}`,
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {
}
