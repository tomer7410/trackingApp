import {ExecutionContext, createParamDecorator} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ICoonnectedUser } from 'src/interfaces/connected-user.interface';

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const gqlCtx = GqlExecutionContext.create(ctx);
      const request = gqlCtx.getContext().req;
      return request.user as ICoonnectedUser;
    },
  );