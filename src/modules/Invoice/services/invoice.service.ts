import http from '@/services/base/http.service'
import { AxiosResponse } from 'axios';

class InvoiceService {
  public getInvoicesByUser() {
    return http.get(`/invoices`)
      .then(({ data }: AxiosResponse) => data);
  }
}

export default new InvoiceService();