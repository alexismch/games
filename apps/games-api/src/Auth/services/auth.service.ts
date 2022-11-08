import { BadRequestException, Injectable } from '@nestjs/common';
import { Auth0Service } from '../../Infrastructure';
import { AUTH_COOKIE_ACCESS_TOKEN } from '../auth.constant';
import { CookieOptions, Response } from 'express';
import { DateTime } from 'luxon';
import { IAuthResponse, ILoginAuthResponse } from '../interfaces';
import { AuthType } from '@games/utils';

@Injectable()
export class AuthService {
   constructor(private auth0Service: Auth0Service) {}

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
