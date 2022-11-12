import { Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../../Auth';
import { Response } from 'express';
import { GqlRes } from '@games/utils';
import { JwtGqlAuthGuard as JwtAuthGuard } from '../../Auth';
import { UseGuards } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Resolver('Auth User')
export class AuthUserResolvers {
   constructor(private authService: AuthService) {}

   @Mutation('logout')
   async logout(@GqlRes() res: Response) {
      return this.authService.logout(res);
   }
}
