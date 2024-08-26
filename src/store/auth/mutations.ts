import { Mutations } from '../mutations.enum';

export default {
  [Mutations.SET_TOKEN](store: any, token: string) {
    store.token = token;
  },
  [Mutations.SET_AUTHENTICATED](store: any, value: boolean) {
    store.isAuthenticated = value;
  },
};
