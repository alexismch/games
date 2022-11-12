import {
   CallHandler,
   ExecutionContext,
   Injectable,
   NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { filter, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services';
import { AuthType } from '@games/utils';
import { ILoginAuthResponse } from '../interfaces';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthCookieInterceptor implements NestInterceptor {
   constructor(private authService: AuthService) {}

   intercept(
      context: ExecutionContext,
      next: CallHandler<ILoginAuthResponse>,
   ): Observable<ILoginAuthResponse> | Promise<Observable<ILoginAuthResponse>> {
      return next.handle().pipe(
         filter((data) => data.type === AuthType.TOKEN),
         map((data) => {
            const ctx = GqlExecutionContext.create(context);
            const response: Response = ctx.getContext().req.res;

            this.authService.setCookies(
               response,
               data.accessToken,
               data.expiresIn,
            );
            data.type = AuthType.SUCCESS;
            delete data.accessToken;

            return data;
         }),
      );
   }
}
