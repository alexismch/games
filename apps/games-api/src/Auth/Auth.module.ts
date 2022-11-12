import { CacheModule, Module } from '@nestjs/common';
import { AuthService } from './services';
import { InfrastructureModule } from '../Infrastructure/Infrastructure.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies';
import { CACHE_TTL } from './auth.constant';
import { UserModule } from '../Domain/user/user.module';

@Module({
   imports: [
      CacheModule.register({ ttl: CACHE_TTL }),
      PassportModule.register({ defaultStrategy: 'jwt' }),
      InfrastructureModule,
      UserModule,
   ],
   providers: [JwtStrategy, AuthService],
   exports: [PassportModule, AuthService],
})
export class AuthModule {}
