import { Mutations } from '../mutations.enum';

export default {
  [Mutations.SET_USER](store: any, user: string) {
    store.user = user;
  },
};
