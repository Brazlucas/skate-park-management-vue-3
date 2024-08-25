import User from '../entities/user.entity';
import { IUserRegisterPayload } from '../interfaces/user-register-payload.interface';
import { IUserLoginPayload } from '../interfaces/user-login-payload.interface';

class UserPayloadAdapter {
  public formatRegister(data: User): IUserRegisterPayload {
    return {
      email: data.email,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
      name: data.name,
    };
  }

  public formatLogin(data: User): IUserLoginPayload {
    return {
      email: data.email,
      password: data.password,
    };
  }
}

export default new UserPayloadAdapter();