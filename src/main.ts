import './instrument';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { apiReference } from '@scalar/nestjs-api-reference';

dotenv.config();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('FLIGHT BOOKING SYSTEM API')
    .setDescription('The API Description of FLIGHT BOOKING SYSTEM APP')
    .setVersion('1.0')
    .addTag('FLIGHT BOOKING SYSTEM')
    .addBearerAuth()
    .build();

  app.setGlobalPrefix('api');
  const document = SwaggerModule.createDocument(app, config);

  // Swagger UI

  app.use(
    '/api/docs',
    apiReference({
      spec: {
        content: document,
      },
    }),
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  app.use(helmet());

  app.disable('x-powered-by', 'X-Powered-By');

  await app.listen(8000);
}
bootstrap();
