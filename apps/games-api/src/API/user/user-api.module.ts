import { Module } from '@nestjs/common';
import { UsersResolvers } from './user.resolvers';
import { UserModule } from '../../Domain/user/user.module';

@Module({
   imports: [UserModule],
   providers: [UsersResolvers],
})
export class UserApiModule {}
