import { Module } from '@nestjs/common';
import { UsersResolvers } from './user.resolvers';
import { UserModule } from '../../Domain/user/user.module';
import { AuthModule } from '../../Auth/Auth.module';

@Module({
   imports: [AuthModule, UserModule],
   providers: [UsersResolvers],
})
export class UserApiModule {}
