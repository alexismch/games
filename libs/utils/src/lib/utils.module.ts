import { UtilsConfig } from './utils.config';
import { Module } from '@nestjs/common';

@Module({
   providers: [UtilsConfig],
})
export class UtilsModule {}
