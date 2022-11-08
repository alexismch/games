import { Module } from '@nestjs/common';
import { AuthService } from './services';
import { InfrastructureModule } from '../Infrastructure/Infrastructure.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies';

@Module({
   imports: [
      PassportModule.register({ defaultStrategy: 'jwt' }),
      InfrastructureModule,
   ],
   providers: [JwtStrategy, AuthService],
   exports: [PassportModule, AuthService],
})
export class AuthModule {}
