import { AxiosResponse } from 'axios';
import http from '@/services/base/http.service';

class LocationService {
  public async getAll() {
    return http
      .get('/locations')
      .then(({ data }: AxiosResponse) => data);
  }

  public async create(data: any) {
    return http
      .post('/locations', data);
  }
}
export default new LocationService();

