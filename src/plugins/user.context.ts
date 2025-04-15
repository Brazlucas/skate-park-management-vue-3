import { inject, provide, readonly, ref, Ref } from 'vue';

const key = Symbol('UserContext');

export interface UserContext {
  user: Ref<any>;
  setUser: (user: any) => void;
}

const user = ref<any>(null);

export function provideUserContext() {
  const setUser = (newUser: any) => {
    user.value = newUser;
    localStorage.setItem('user-info', JSON.stringify(newUser));
  };

  const stored = localStorage.getItem('user-info');
  if (stored) {
    user.value = JSON.parse(stored);
  }

  provide<UserContext>(key, {
    user,
    setUser,
  });
}

export function useUserContext(): UserContext {
  const context = inject<UserContext>(key);
  if (!context) {
    throw new Error('User context not provided');
  }
  return context;
}
