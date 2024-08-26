import http from '@/services/base/http.service'
import User from '../../entities/user.entity';
import { AxiosResponse } from 'axios';
import userPayloadAdapter from '../../adapters/user-payload.adapter';

class RegisterService {
  public async register(data: User): Promise<string> {
    return http
      .post('/register', userPayloadAdapter.formatRegister(data))
      .then(({ data }: AxiosResponse) => data);
  }
}

export default new RegisterService();