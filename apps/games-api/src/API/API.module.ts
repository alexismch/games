import { Module } from '@nestjs/common';
import { AuthApiModule } from './auth/auth-api.module';
import { UserApiModule } from './user/user-api.module';

@Module({
   imports: [AuthApiModule, UserApiModule],
})
export class APIModule {}
