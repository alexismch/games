import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

export const GqlIp = createParamDecorator(
   (data: unknown, context: ExecutionContext) => {
      const ctx = GqlExecutionContext.create(context);
      const req: Request = ctx.getContext().req;
      return req.ip;
   },
);
