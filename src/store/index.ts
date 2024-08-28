import UserModule from '@/store/user/index';
import AuthModule from '@/store/auth/index';
import Vuex from 'vuex';

export default new Vuex.Store({
  modules: {
    UserModule,
    AuthModule,
  },
});