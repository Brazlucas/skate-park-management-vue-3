import { createStore } from 'vuex';
import UserModule from '@/store/auth/index';
import AuthModule from '@/store/auth/index';

export const store = createStore({
  modules: {
    AuthModule,
    UserModule,
  },
});