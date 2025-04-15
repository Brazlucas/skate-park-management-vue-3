<template>
  <v-snackbar
    v-model="visible"
    :color="typeColor"
    timeout="2000"
    top
    right
  >
    <div class="d-flex justify-space-between">
      <span>{{ message }}</span>
      <v-icon small @click="visible = false">mdi-close</v-icon>
    </div>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useSnackbar } from '@/plugins/snackbar.plugin';

const { visible, message, type } = useSnackbar();

const typeColor = computed(() => (type.value === 'success' ? 'green' : 'red'));
</script>
