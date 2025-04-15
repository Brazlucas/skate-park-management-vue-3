import { IUserData } from '../interfaces/user-data.interface';

export default class User {
  public email: string;

  public password: string;

  public passwordConfirmation: string;

  public name: string;

  public token: string;

  public createdAt: string;

  public isAdmin: boolean;

  public address: string;

  public phone: string;

  public notifications: { sms: boolean; email: boolean };

  public id: number;

  constructor(user: IUserData = {
    name: '',
    email: '',
    token: '',
    created_at: '',
    password: '',
    password_confirmation: '',
    is_admin: false,
    address: '',
    phone: '',
    notifications: { sms: false, email: false },
    id: 0,
  }) {
    this.notifications = user.notifications;
    this.token = user.token;
    this.email = user.email;
    this.name = user.name;
    this.createdAt = user.created_at;
    this.password = user.password;
    this.passwordConfirmation = user.password_confirmation;
    this.isAdmin = user.is_admin;
    this.address = user.address;
    this.phone = user.phone;
    this.id = user.id;
  }
}