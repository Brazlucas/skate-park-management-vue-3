import http from '@/services/base/http.service'
import Auth from '../entities/auth.entity';
import { AxiosResponse } from 'axios';

class AuthService {
  public async login(data: Auth): Promise<string> {
    return http
      .post('/login', data)
      .then(({ data }: AxiosResponse) => data);
  }
}

export default new AuthService();