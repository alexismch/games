import { BadRequestException, Injectable } from '@nestjs/common';
import { Auth0Service } from '../../Infrastructure';
import { AuthError } from '@games/utils';

@Injectable()
export class AuthService {
   constructor(private auth0Service: Auth0Service) {}

   async login(username: string, password: string) {
      try {
         return await this.auth0Service.signIn(username, password);
      } catch {
         throw new BadRequestException(AuthError.INVALID_CREDENTIALS);
      }
   }

   async register(email: string, username: string, password: string) {
      try {
         return await this.auth0Service.signUp(email, username, password);
      } catch (e) {
         throw new BadRequestException(e.message);
      }
   }
}
