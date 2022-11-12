import { Module } from '@nestjs/common';
import { PrismaModule } from '../../Prisma/Prisma.module';
import { UserService } from './services';
import { InfrastructureModule } from '../../Infrastructure/Infrastructure.module';

@Module({
   imports: [PrismaModule, InfrastructureModule],
   providers: [UserService],
   exports: [UserService],
})
export class UserModule {}
