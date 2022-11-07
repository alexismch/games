/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { PrismaService } from './Prisma';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

   const prismaService = app.get(PrismaService);
   await prismaService.enableShutdownHooks(app);

   app.useGlobalPipes(new ValidationPipe({ transform: true }));

   const port = process.env.PORT || 3333;
   await app.listen(port);
   Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
}

bootstrap();
