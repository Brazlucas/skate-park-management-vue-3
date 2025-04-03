import { IUserRegisterPayload } from './user-register-payload.interface';

export interface IUserInternalRegisterPayload extends IUserRegisterPayload{
  notifications: { sms: boolean; email: boolean };
  is_admin: boolean;
}