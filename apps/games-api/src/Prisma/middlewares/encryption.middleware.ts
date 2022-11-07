import { Prisma } from '../client';
import { PrismaMiddleware } from './prisma.middleware';
import { Injectable } from '@nestjs/common';
import { isArray } from 'class-validator';
import { CryptoUtils } from '@games/utils';

@Injectable()
export class EncryptionMiddleware extends PrismaMiddleware {
   private static ENCRYPTED_PROPS: {
      [prop: string]: {
         hasBidx: boolean;
      };
   } = {
      email: {
         hasBidx: true,
      },
      username: {
         hasBidx: true,
      },
      alias: {
         hasBidx: true,
      },
   };

   async use(params: Prisma.MiddlewareParams, next) {
      params.args = EncryptionMiddleware.encrypt(params.args);
      const result = await next(params);
      return EncryptionMiddleware.decrypt(result);
   }

   private static encrypt(source: Object | Object[]) {
      if (isArray(source)) {
         const encryptedObjects = [];

         for (let i = 0; i < (source as Object[]).length; i++) {
            encryptedObjects.push(this.encrypt(source[i]));
         }

         return encryptedObjects;
      } else {
         const keys = Object.keys(source);

         for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const prop = source[keys[i]];

            if (this.ENCRYPTED_PROPS[key]) {
               source[key] = CryptoUtils.encrypt(prop);
               if (this.ENCRYPTED_PROPS[key].hasBidx) {
                  source[`${key}_bidx`] = CryptoUtils.hash(prop);
               }
            } else if (typeof prop === 'object') {
               source[keys[i]] = this.encrypt(prop);
            }
         }

         return source;
      }
   }

   private static decrypt(source: Object | Object[]) {
      if (isArray(source)) {
         const decryptedObjects = [];

         for (let i = 0; i < (source as Object[]).length; i++) {
            decryptedObjects.push(this.decrypt(source[i]));
         }

         return decryptedObjects;
      } else {
         const keys = Object.keys(source);

         for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const prop = source[keys[i]];

            if (this.ENCRYPTED_PROPS[key]) {
               source[key] = CryptoUtils.decrypt(prop);
               if (this.ENCRYPTED_PROPS[key].hasBidx) {
                  delete source[`${key}_bidx`];
               }
            } else if (typeof prop === 'object') {
               source[keys[i]] = this.decrypt(prop);
            }
         }

         return source;
      }
   }
}
