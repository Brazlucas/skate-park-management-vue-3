import { AxiosResponse } from 'axios';
import http from '@/services/base/http.service';
import SkatePark from '../entities/skate-park.entity';
import skateParkPayloadAdapter from '../adapters/skate-park-payload.adapter';

class SkateParkService {
  public async create(data: SkatePark) {
    return http
      .post('/skate-parks', skateParkPayloadAdapter.formatPayload(data));
  }
  public async update(data: SkatePark) {
    return http
      .put(`/skate-parks/${data.id}`, data);
  }
  public async getAll() {
    return http
      .get('/skate-parks')
      .then(({ data }: AxiosResponse) => data);
  }
  public async getById(id: string) {
    return http
      .get(`/skate-parks/${id}`)
      .then(({ data }: AxiosResponse) => data);
  }
  public async delete(id: string) {
    return http
      .delete(`/skate-parks/${id}`)
      .then(({ data }: AxiosResponse) => data);
  }
}
export default new SkateParkService();

