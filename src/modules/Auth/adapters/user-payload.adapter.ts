import User from '../entities/user.entity';
import { IUserLogoutPayload } from './../interfaces/user-logout.interface';
import { IUserRegisterPayload } from '../interfaces/user-register-payload.interface';
import { IUserLoginPayload } from '../interfaces/user-login-payload.interface';
import { IUserInternalRegisterPayload } from '../interfaces/user-internal-register-payload.interface';

class UserPayloadAdapter {
  public formatRegister(data: User): IUserRegisterPayload {
    return {
      phone: data.phone,
      address: data.address,
      email: data.email,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
      name: data.name,
    };
  }

  public formatInternalRegister(data: User): IUserInternalRegisterPayload {
    return {
      phone: data.phone,
      address: data.address,
      email: data.email,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
      name: data.name,
      notifications: data.notifications,
      is_admin: data.isAdmin,
    };
  }

  public formatLogin(data: User): IUserLoginPayload {
    return {
      email: data.email,
      password: data.password,
    };
  }

  public formatLogout(data: User): IUserLogoutPayload {
    return {
      token: data.token,
    };
  }
}

export default new UserPayloadAdapter();