import http from '@/services/base/http.service'
import { AxiosResponse } from 'axios';

class UserService {
  public getUsers() {
    return http.get('/users')
      .then(({ data }: AxiosResponse) => data);
  }
}

export default new UserService();