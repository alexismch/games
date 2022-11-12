import { Module } from '@nestjs/common';
import { PrismaService } from './services';
import { PRISMA_MIDDLEWARES } from './prisma.constant';
import { PrismaMiddleware, EncryptionMiddleware } from './middlewares';
import { ValueProvider } from '@nestjs/common/interfaces/modules/provider.interface';

const PrismaMiddlewares: ValueProvider<PrismaMiddleware[]> = {
   provide: PRISMA_MIDDLEWARES,
   useValue: [new EncryptionMiddleware()],
};

@Module({
   providers: [PrismaService, PrismaMiddlewares],
   exports: [PrismaService],
})
export class PrismaModule {}
