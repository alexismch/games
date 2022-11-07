import { Module } from '@nestjs/common';
import { AuthModule } from '../../Auth/Auth.module';
import { AuthResolvers } from './auth.resolvers';
import { UserModule } from '../../Domain/user/user.module';
import { InfrastructureModule } from '../../Infrastructure/Infrastructure.module';

@Module({
   imports: [AuthModule, UserModule, InfrastructureModule],
   providers: [AuthResolvers],
})
export class AuthApiModule {}
