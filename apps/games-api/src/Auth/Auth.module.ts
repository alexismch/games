import { Module } from '@nestjs/common';
import { AuthService } from './services';
import { InfrastructureModule } from '../Infrastructure/Infrastructure.module';

@Module({
   imports: [InfrastructureModule],
   providers: [AuthService],
   exports: [AuthService],
})
export class AuthModule {}
