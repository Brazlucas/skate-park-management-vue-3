import Vuex from 'vuex';
import UserModule from '@/store/user/index';
import AuthModule from '@/store/auth/index';
import LoaderModule from '@/store/loader/index';

export default new Vuex.Store({
  modules: {
    UserModule,
    AuthModule,
    LoaderModule,
  },
});