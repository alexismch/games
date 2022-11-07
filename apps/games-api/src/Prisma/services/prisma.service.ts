import {
   INestApplication,
   Inject,
   Injectable,
   OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '../client';
import { PRISMA_MIDDLEWARES } from '../prisma.constant';
import { PrismaMiddleware } from '../middlewares';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
   constructor(@Inject(PRISMA_MIDDLEWARES) middlewares: PrismaMiddleware[]) {
      super();

      for (let i = 0; i < middlewares.length; i++) {
         this.$use(middlewares[i].use);
      }
   }

   async onModuleInit() {
      await this.$connect();
   }

   async enableShutdownHooks(app: INestApplication) {
      this.$on('beforeExit', async () => {
         await app.close();
      });
   }
}
