import {
   BadRequestException,
   CACHE_MANAGER,
   Inject,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common';
import { Auth0Service } from '../../Infrastructure';
import { AUTH_COOKIE_ACCESS_TOKEN, CACHE_PREFIX } from '../auth.constant';
import { CookieOptions, Response } from 'express';
import { DateTime } from 'luxon';
import { IAuthResponse, ILoginAuthResponse } from '../interfaces';
import { AuthType } from '@games/utils';
import { Cache } from 'cache-manager';
import { UserService } from '../../Domain/user';

@Injectable()
export class AuthService {
   constructor(
      @Inject(CACHE_MANAGER) private cacheManager: Cache,
      private auth0Service: Auth0Service,
      private userService: UserService,
   ) {}

   async login(
      username: string,
      password: string,
      forwardedFor?: string,
   ): Promise<ILoginAuthResponse> {
      try {
         return await this.auth0Service.signIn(
            username,
            password,
            forwardedFor,
         );
      } catch (e) {
         throw new BadRequestException(e.message);
      }
   }

   async register(email: string, username: string, password: string) {
      try {
         return await this.auth0Service.signUp(email, username, password);
      } catch (e) {
         throw new BadRequestException(e.message);
      }
   }

   async logout(response: Response): Promise<IAuthResponse> {
      this.clearCookies(response);

      return {
         type: AuthType.SUCCESS,
      };
   }

   async getUserByAlias(alias: string) {
      try {
         const key = AuthService.getAliasCacheKey(alias);

         // Check in cache
         let user = await this.cacheManager.get(key);
         if (user) {
            return user;
         }

         // Retrieve and set in cache
         user = await this.userService.findOneByAlias(alias);
         await this.cacheManager.set(key, user);

         return user;
      } catch {
         throw new UnauthorizedException();
      }
   }

   private static getAliasCacheKey(alias: string) {
      return `${CACHE_PREFIX}_${alias}`;
   }

   /**
    * Assign cookies
    */
   setCookies(response: Response, accessToken: string, expiresIn?: number) {
      response.cookie(
         AUTH_COOKIE_ACCESS_TOKEN,
         accessToken,
         this.getCookieOptions(
            DateTime.now()
               .plus({ second: expiresIn || 3600 })
               .toJSDate(),
         ),
      );
   }

   /**
    * Invalid cookies
    */
   clearCookies(response: Response) {
      const cookieOptions = this.getCookieOptions(new Date(0), false);
      response.clearCookie(AUTH_COOKIE_ACCESS_TOKEN, cookieOptions);
   }

   private getCookieOptions(expiresOn: Date, signed = true): CookieOptions {
      // TODO : adapt for prod
      return {
         domain: 'localhost',
         httpOnly: true,
         secure: false,
         signed,
         expires: expiresOn,
      };
   }
}
