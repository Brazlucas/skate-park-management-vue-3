import http from '@/services/base/http.service'
import User from '../entities/user.entity';
import { AxiosResponse } from 'axios';
import userPayloadAdapter from '../adapters/user-payload.adapter';

class AuthService {
  public async login(data: User): Promise<string> {
    return http
      .post('/login', userPayloadAdapter.formatLogin(data))
      .then(({ data }: AxiosResponse) => data);
  }
}

export default new AuthService();