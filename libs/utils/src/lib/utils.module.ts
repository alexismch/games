import { UtilsConfig } from './utils.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
   imports: [ConfigModule],
   providers: [UtilsConfig],
})
export class UtilsModule {}
