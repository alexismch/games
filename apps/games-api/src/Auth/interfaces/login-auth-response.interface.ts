import { IAuthResponse } from './auth-response.interface';

export interface ILoginAuthResponse extends IAuthResponse {
   accessToken?: string;
   expiresIn?: number;
}
