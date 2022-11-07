import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type ValidatedConfigService = ConfigService<
   {
      CRYPT_KEY: string;
      HASH_KEY: string;
   },
   true
>;

@Injectable()
export class UtilsConfig {
   static configService: ValidatedConfigService;

   constructor(@Inject(ConfigService) configService: ValidatedConfigService) {
      UtilsConfig.configService = configService;
   }
}
