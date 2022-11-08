import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthCookieInterceptor, AuthService } from '../../Auth';
import { UserRegistered } from '../../graphql.schema';
import { UserService } from '../../Domain/user';
import { Auth0Service } from '../../Infrastructure';
import { InternalServerErrorException, UseInterceptors } from '@nestjs/common';
import { GqlIp as Ip } from '@games/utils';

@Resolver('Auth')
export class AuthResolvers {
   constructor(
      private authService: AuthService,
      private usersService: UserService,
      private auth0Servie: Auth0Service,
   ) {}

   @Mutation('login')
   @UseInterceptors(AuthCookieInterceptor)
   async login(
      @Args('login') login: string,
      @Args('password') password: string,
      @Ip() ip: string,
   ) {
      return await this.authService.login(login, password, ip);
   }

   @Mutation('register')
   async register(
      @Args('email') email: string,
      @Args('username') username: string,
      @Args('password') password: string,
   ): Promise<UserRegistered> {
      const authUser = await this.authService.register(
         email,
         username,
         password,
      );

      try {
         return await this.usersService.create({
            email: authUser.email,
            username: authUser.username,
            alias: authUser.id,
         });
      } catch {
         await this.auth0Servie.delete(authUser.id);
         throw new InternalServerErrorException();
      }
   }
}
