import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, SelfUser } from '../../graphql.schema';
import { UserService } from '../../Domain/user';
import { UseGuards } from '@nestjs/common';
import { JwtGqlAuthGuard as JwtAuthGuard } from '../../Auth';
import { User as RequestUser } from '../../Prisma';
import { GqlUser } from '@games/utils';

@UseGuards(JwtAuthGuard)
@Resolver('User')
export class UsersResolvers {
   constructor(private usersService: UserService) {}

   @Query('users')
   async users(): Promise<User[]> {
      return this.usersService.findAll();
   }

   @Query('user')
   async user(@GqlUser() user: RequestUser): Promise<SelfUser> {
      return this.usersService.findOne(user.id);
   }

   @Mutation('deleteUser')
   async delete(@Args('id') id: string): Promise<User> {
      return this.usersService.delete(id);
   }
}
