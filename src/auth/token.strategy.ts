import {
    jwtConstants
  } from './constants';
  
  import {
    ExtractJwt,
    Strategy
  } from 'passport-jwt';
  import {
    PassportStrategy
  } from '@nestjs/passport';
  import {
    Injectable
  } from '@nestjs/common';
  import { Request } from 'express';
  
  @Injectable()
  export class TokenStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor() {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: jwtConstants.secret,
        passReqToCallback: true,
      });
    }
  
    
  validate(req: Request, payload: any) {
    const token = req.get('Authorization').replace('Bearer', '').trim();
    return { ...payload, token };
  }

  }