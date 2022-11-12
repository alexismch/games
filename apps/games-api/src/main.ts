import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { PrismaService } from './Prisma';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   const configService = app.get(ConfigService);

   // Prisma
   const prismaService = app.get(PrismaService);
   await prismaService.enableShutdownHooks(app);

   // Pipes
   // TODO : check
   app.useGlobalPipes(new ValidationPipe({ transform: true }));

   // Middlewares
   app.use(cookieParser(configService.get('COOKIE_SECRET')));
   app.use(helmet());

   const port = configService.get('PORT') || 3333;
   await app.listen(port);
   Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
}

bootstrap();
