import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AUTH_COOKIE_ACCESS_TOKEN } from '../auth.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(configService: ConfigService) {
      super({
         secretOrKeyProvider: passportJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: `https://${configService.get<string>(
               'AUTH0_DOMAIN',
            )}/.well-known/jwks.json`,
         }),

         jwtFromRequest: (req: Request) =>
            req.signedCookies[AUTH_COOKIE_ACCESS_TOKEN],
         audience: configService.get<string>('AUTH0_AUDIENCE'),
         issuer: `https://${configService.get<string>('AUTH0_DOMAIN')}/`,
         algorithms: ['RS256'],
      });
   }

   validate(payload: { sub: string }) {
      return { alias: payload?.sub };
   }
}
