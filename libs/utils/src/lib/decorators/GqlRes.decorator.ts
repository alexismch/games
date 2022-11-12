import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';

export const GqlRes = createParamDecorator(
   (data: unknown, context: ExecutionContext): Response => {
      const ctx = GqlExecutionContext.create(context);
      const req: Request = ctx.getContext().req;
      return req.res;
   },
);
