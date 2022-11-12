import {
   Injectable,
   InternalServerErrorException,
   NotFoundException,
} from '@nestjs/common';
import { Auth0Service } from '../../../Infrastructure';
import { PrismaService } from '../../../Prisma';
import { User } from '../../../Prisma';

@Injectable()
export class UserService {
   constructor(
      private prisma: PrismaService,
      private auth0Service: Auth0Service,
   ) {}

   async findOne(id: string): Promise<User | null> {
      const user = await this.prisma.user.findUnique({
         where: {
            id,
         },
      });

      if (!user) {
         throw new NotFoundException();
      }

      return user;
   }

   async findOneByAlias(alias: string): Promise<User | null> {
      const user = await this.prisma.user.findUnique({
         where: {
            alias,
         },
      });

      if (!user) {
         throw new NotFoundException();
      }

      return user;
   }

   async findAll(): Promise<User[]> {
      return this.prisma.user.findMany({});
   }

   async create(
      user: Pick<User, 'email' | 'username' | 'alias'>,
   ): Promise<User> {
      return this.prisma.user.create({
         data: user,
      });
   }

   async delete(id: string): Promise<User> {
      return this.prisma.$transaction<User>(async (tx) => {
         let deletedUser;
         try {
            deletedUser = await tx.user.delete({
               where: {
                  id,
               },
            });
         } catch {
            throw new NotFoundException();
         }

         if (!deletedUser) {
            throw new NotFoundException();
         }

         try {
            await this.auth0Service.delete(deletedUser.alias);
         } catch {
            throw new InternalServerErrorException();
         }

         return deletedUser;
      });
   }
}
