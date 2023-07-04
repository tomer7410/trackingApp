import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from '../strategies/local/constants'
  import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();

        return super.canActivate(
            new ExecutionContextHost([req]),
        );
    }

    handleRequest(err: any, user: any) {
        if (err || !user) {
            throw err || new AuthenticationError('GqlAuthGuard');
        }
        return user;
    }
  }