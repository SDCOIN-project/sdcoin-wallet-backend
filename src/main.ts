import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from './config/config.service';
import * as Sentry from '@sentry/node';

import * as path from 'path';
import * as config from 'config';

async function bootstrap() {

  if (config.SENTRY_DSN) {
    Sentry.init({ dsn: config.SENTRY_DSN, environment: config.NODE_APP_INSTANCE });
  }

  const configService = new ConfigService();
  let corsOptions = {};
  if (configService.get().CORS) {
    corsOptions = {
      cors: {
        origin: true,
        credentials: true,
      },
    };
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule, corsOptions);
  app.useGlobalPipes(new ValidationPipe({ transform: true, validationError: { target: false } }));
  app.setGlobalPrefix('api/v1');

  const options = new DocumentBuilder()
    .setTitle('SDCoin backend')
    .setDescription('SDCoin Wallet Backend')
    .setVersion('1.0')
    .setBasePath('api/v1')
    .setSchemes('https', 'http')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/doc', app, document);
  app.useStaticAssets(path.resolve(__dirname + '/../public'), {prefix: '/api/images/'});
  await app.listen(3000);
}

bootstrap();
