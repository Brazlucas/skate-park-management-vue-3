import { store } from '@/store';
import authService from '@/modules/Auth/services/auth.service';
import User from '@/modules/Auth/entities/user.entity';

class RenderApp {
  public async getRequireInfo() {
    const { token } = store.getters;

    if (token) {
      const data = await authService.getAuthUserInfo();
      const userInfo = new User(data);
      store.dispatch('setUser', userInfo);
    }
  }
}

export default new RenderApp();
