/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { PrismaService } from './Prisma';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

   const configService = app.get(ConfigService);

   const prismaService = app.get(PrismaService);
   await prismaService.enableShutdownHooks(app);

   // TODO : vérifier
   app.useGlobalPipes(new ValidationPipe({ transform: true }));

   app.use(cookieParser(configService.get('COOKIE_SECRET')));

   const port = configService.get('PORT') || 3333;
   await app.listen(port);
   Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
}

bootstrap();
