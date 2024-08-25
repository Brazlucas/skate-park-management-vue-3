import { IUserData } from "../interfaces/user-data.interface";

export default class User {
  public email: string;

  public password: string;

  public passwordConfirmation: string;

  public name: string;

  public token: string;

  constructor(user: IUserData = {
    email: '',
    password: '',
    password_confirmation: '',
    name: '',
    token: '',
  }) {
    this.token = user.token;
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.passwordConfirmation = user.password_confirmation;
  }
}