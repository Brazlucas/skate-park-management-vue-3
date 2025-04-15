export interface IUserData {
  email: string;
  password: string;
  password_confirmation: string;
  created_at: string;
  name: string;
  id: number;
  token: string;
  is_admin: boolean;
  address: string;
  phone: string;
  notifications: {
    sms: boolean;
    email: boolean;
  };
}