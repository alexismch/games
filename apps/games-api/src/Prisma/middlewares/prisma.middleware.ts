import { Prisma } from '../client';

export abstract class PrismaMiddleware {
   abstract use(params: Prisma.MiddlewareParams, next);
}
