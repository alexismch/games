import { AuthType } from '@games/utils';

export interface IAuthResponse {
   type: AuthType;
   accessToken?: string;
   expiresIn?: number;
}
