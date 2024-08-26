import { Mutations } from '../mutations.enum';

export default {
  setUser({ commit }: any, user: any) {
    localStorage.setItem('user-info', JSON.stringify(user));
    commit(Mutations.SET_USER, JSON.stringify(user));
  },
};
