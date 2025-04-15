import { Mutations } from '../mutations.enum';

export default {
  [Mutations.SET_USER](state: any, user: any) {
    state.user = user;
  },
};
