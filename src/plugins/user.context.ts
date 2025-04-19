import { readonly, ref } from 'vue';

const user = ref<any>(null);

export function setUserContext(newUser: any) {
  user.value = newUser;
  localStorage.setItem('user-info', JSON.stringify(newUser));
}

export function loadUserContextFromLocalStorage() {
  const stored = localStorage.getItem('user-info');
  if (stored) {
    user.value = JSON.parse(stored);
  }
}

export function useUserContext() {
  return {
    user: readonly(user),
    setUser: setUserContext
  };
}
