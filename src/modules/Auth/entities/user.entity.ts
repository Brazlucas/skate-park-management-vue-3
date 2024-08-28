import { IUserData } from '../interfaces/user-data.interface';

export default class User {
  public email: string;

  public password: string;

  public passwordConfirmation: string;

  public name: string;

  public token: string;

  public createdAt: string;

  constructor(user: IUserData = {
    name: '',
    email: '',
    token: '',
    created_at: '',
    password: '',
    password_confirmation: '',
  }) {
    this.token = user.token;
    this.email = user.email;
    this.name = user.name;
    this.createdAt = user.created_at;
    this.password = user.password;
    this.passwordConfirmation = user.password_confirmation;
  }
}