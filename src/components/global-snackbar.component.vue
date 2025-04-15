<template>
  <v-snackbar
    v-model="visible"
    :color="typeColor"
    timeout="2000"
    top
    right
  >
    {{ message }}
    <v-btn @click="visible = false">
      <v-icon small>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useSnackbar } from '@/plugins/snackbar.plugin';

const { visible, message, type } = useSnackbar();

const typeColor = computed(() => (type.value === 'success' ? 'green' : 'red'));
</script>
