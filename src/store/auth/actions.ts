import { Mutations } from '../mutations.enum';

export default {
  setToken({ commit }: any, token: string) {
    localStorage.setItem('token', token);
    commit(Mutations.SET_TOKEN, token);
  },
  setIsAuthenticated({ commit }: any, value: boolean) {
    commit(Mutations.SET_AUTHENTICATED, value);
  },
};
