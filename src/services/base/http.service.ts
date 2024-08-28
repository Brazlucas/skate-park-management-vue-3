import axios from 'axios';
import store from '@/store';

const baseURL = 'http://localhost/api';

const http = axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

http.interceptors.request.use(
  (axiosRequestConfig: any) => {
    const { token } = store.getters;
    axiosRequestConfig.headers!.Authorization = `Bearer ${token}`;
    axiosRequestConfig.headers!['Content-Type'] = 'application/json';
    axiosRequestConfig.headers!.Accept = 'application/json';
    return axiosRequestConfig;
  },
);

// Código abaixo será utilizado com refresh token
// http.interceptors.response.use(
//   (axiosResponse: AxiosResponse) => axiosResponse,
//   (axiosError: AxiosError): any => {
//     const request = axiosError.config;
//     const { token } = store.getters;

//     if (axiosError.response && axiosError.response.status === 401) {
//       refreshToken(token)
//         .then((newToken: string) => {
//           store.dispatch('setToken', newToken);
//           return axios(request);
//         })
//         .catch((err: any) => {
//           router.push({ name: 'login' });
//           throw new Error(`Não foi possivel setar o novo token ${err}`);
//         });
//     }
//     if (axiosError.response && axiosError.response.status === 403) {
//       router.push({ name: 'not-authorized' });
//     }

//     return Promise.reject(axiosError);
//   },
// );

// function refreshToken(currentToken: string) {
//   const token = currentToken || store.getters.token;

//   return http
//     .get(`/auth/refresh-token?token=${token}`)
//     .then(({ data }: AxiosResponse) => data.data.access_token);
// }

export default http;