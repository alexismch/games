import { Injectable } from '@nestjs/common';
import { AuthenticationClient, ManagementClient } from 'auth0';
import {
   AUTH0_CONNECTION,
   AUTH0_USER_ID_PREFIX,
} from '../infrastructure.constant';
import { Auth0Error } from '../enum';
import { AuthError, AuthType } from '@games/utils';
import { ConfigService } from '@nestjs/config';
import { IAuthResponse } from '../../Auth';

@Injectable()
export class Auth0Service {
   private authenticationClient: AuthenticationClient;
   private managementClient: ManagementClient;

   constructor(private configService: ConfigService) {
      const options = {
         domain: configService.get('AUTH0_DOMAIN'),
         clientId: configService.get('AUTH0_CLIENT_ID'),
         clientSecret: configService.get('AUTH0_CLIENT_SECRET'),
      };

      this.authenticationClient = new AuthenticationClient(options);
      this.managementClient = new ManagementClient(options);
   }

   async signIn(
      username: string,
      password: string,
      forwardedFor?: string,
   ): Promise<IAuthResponse> {
      try {
         const value = await this.authenticationClient.passwordGrant(
            {
               username,
               password,
               audience: this.configService.get('AUTH0_AUDIENCE'),
            },
            { forwardedFor },
         );

         return {
            type: AuthType.TOKEN,
            accessToken: value.access_token,
         };
      } catch {
         throw new Error(AuthError.INVALID_CREDENTIALS);
      }
   }

   async signUp(email: string, username: string, password: string) {
      try {
         const user = await this.authenticationClient.database.signUp({
            email,
            username,
            password,
            connection: AUTH0_CONNECTION,
         });

         return {
            ...user,
            id: `${AUTH0_USER_ID_PREFIX}${user._id}`,
         };
      } catch (e) {
         switch (e.message) {
            case Auth0Error.PASSWORD_TOO_WEAK:
               throw new Error(AuthError.PASSWORD_TOO_WEAK);
            default:
               throw new Error(AuthError.EMAIL_USERNAME_ALREADY_IN_USE);
         }
      }
   }

   async delete(id: string) {
      await this.managementClient.deleteUser({
         id,
      });
   }
}
