import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../../graphql.schema';
import { UserService } from '../../Domain/user';
import { UseGuards } from '@nestjs/common';
import { JwtGqlAuthGuard } from '../../Auth';

@UseGuards(JwtGqlAuthGuard)
@Resolver('User')
export class UsersResolvers {
   constructor(private usersService: UserService) {}

   @Query('users')
   async users(): Promise<User[]> {
      return this.usersService.findAll();
   }

   @Query('user')
   async user(@Args('id') args: string): Promise<User> {
      return this.usersService.findOne(args);
   }

   @Mutation('deleteUser')
   async delete(@Args('id') args: string): Promise<User> {
      return this.usersService.delete(args);
   }
}
