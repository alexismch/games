import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { APIModule } from './API/API.module';
import { DomainModule } from './Domain/Domain.module';
import { InfrastructureModule } from './Infrastructure/Infrastructure.module';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from '@games/utils';

@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
         expandVariables: true,
         cache: true,
      }),
      UtilsModule,
      GraphQLModule.forRoot<ApolloDriverConfig>({
         driver: ApolloDriver,
         typePaths: ['./**/*.graphql'],
         path: '/',
         installSubscriptionHandlers: true,
         autoTransformHttpErrors: true,
         bodyParserConfig: true,
         cors: true,
         sortSchema: true,
         definitions: {
            path: join(process.cwd(), 'apps/games-api/src/graphql.schema.ts'),
            outputAs: 'interface',
         },
      }),
      InfrastructureModule,
      APIModule,
      DomainModule,
   ],
})
export class AppModule {}
