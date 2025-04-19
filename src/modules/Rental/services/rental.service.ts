import { AxiosResponse } from 'axios';
import http from '@/services/base/http.service';

interface RentalPayload {
  skate_park_id: number;
  renter_name: string;
  start_time: string;
  end_time: string;
}

class RentalService {
  public async create(payload: any) {
    return http.post('/rentals', payload).then(({ data }: AxiosResponse) => data);
  }

  public async update(id: number, payload: RentalPayload) {
    return http.put(`/rentals/${id}`, payload).then(({ data }: AxiosResponse) => data);
  }

  public async getAll() {
    return http.get('/rentals').then(({ data }: AxiosResponse) => data);
  }

  public async getById(id: number) {
    return http.get(`/rentals/${id}`).then(({ data }: AxiosResponse) => data);
  }

  public async delete(id: number) {
    return http.delete(`/rentals/${id}`).then(({ data }: AxiosResponse) => data);
  }

  public async getAvailableHours(date: string, skateParkId: number) {
    return http
      .get('/rentals/available-hours', {
        params: { date, skate_park_id: skateParkId },
      })
      .then(({ data }: AxiosResponse) => data);
  }

  public async getRentalsByUser() {
    return http
      .get(`/rentals/user`)
      .then(({ data }: AxiosResponse) => data);
  }
}

export default new RentalService();
