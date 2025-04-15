// src/types/vue-shim.d.ts
import 'vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $snackbar: (message: string, type?: 'success' | 'error') => void;
  }
}
