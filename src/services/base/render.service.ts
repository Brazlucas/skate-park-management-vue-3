import store from '@/store';
import authService from '@/modules/Auth/services/auth.service';
import User from '@/modules/Auth/entities/user.entity';

export default class RenderApp {
  static async getRequireInfo() {
    const { token } = store.getters;

    if (token) {
      const data = await authService.getAuthUserInfo();
      const userInfo = new User(data.user);
      store.dispatch('setUser', userInfo);
    }
  }
}
