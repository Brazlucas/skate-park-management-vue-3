import { App, inject, ref } from 'vue';

export const snackbarKey = Symbol('snackbar');

export function createSnackbar() {
  const visible = ref(false);
  const message = ref('');
  const type = ref<'success' | 'error'>('success');

  function showSnackbar(msg: string, msgType: 'success' | 'error' = 'success') {
    message.value = msg;
    type.value = msgType;
    visible.value = true;
  }

  return {
    visible,
    message,
    type,
    showSnackbar,
  };
}

export function useSnackbar() {
  const snackbar = inject<ReturnType<typeof createSnackbar>>(snackbarKey);
  if (!snackbar) {
    throw new Error('useSnackbar() must be used within the Snackbar plugin context');
  }
  return snackbar;
}

export default {
  install(app: App) {
    const snackbar = createSnackbar();
    app.provide(snackbarKey, snackbar);
    app.config.globalProperties.$snackbar = snackbar.showSnackbar;
  },
};
