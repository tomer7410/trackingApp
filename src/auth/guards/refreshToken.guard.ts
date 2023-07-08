import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-core';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {

    canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();

        return super.canActivate(
            new ExecutionContextHost([req]),
        );

    }

    handleRequest(err: any, user: any) {
        if (err || !user) {
            throw err || new AuthenticationError('RefreshTokenGuards');
        }
        return user;
    }

}