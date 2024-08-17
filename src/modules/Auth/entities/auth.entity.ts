import { IAuthData } from './../components/interfaces/auth-data.interface';

export default class Auth {
  public email: string;

  public password: string;

  public token?: string;

  constructor(auth: IAuthData = {
    email: '',
    password: '',
  }) {
    this.email = auth.email;
    this.password = auth.password;
    this.token = auth.token;
  }
}