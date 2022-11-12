import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

export const GqlReq = createParamDecorator(
   (data: unknown, context: ExecutionContext): Request => {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req;
   },
);
