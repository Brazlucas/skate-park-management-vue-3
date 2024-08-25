import http from '@/services/base/http.service'
import { store } from '@/store';
import router from '@/router';
import User from '../entities/user.entity';
import { AxiosResponse } from 'axios';
import userPayloadAdapter from '../adapters/user-payload.adapter';

class AuthService {
  public async login(data: User): Promise<string> {
    return http
      .post('/login', userPayloadAdapter.formatLogin(data))
      .then(({ data }: AxiosResponse) => data);
  }

  public getAuthUserInfo() {
    return http.get('/user-info')
      .then(({ data }: AxiosResponse) => data);
  }

  public logout() {
    localStorage.clear();
    store.dispatch('setToken', '');
    router.push({ name: 'login' });
  }
}

export default new AuthService();