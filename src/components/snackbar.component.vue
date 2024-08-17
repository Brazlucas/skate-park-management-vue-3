<template>
  <v-snackbar v-model="snackbar">
    {{ value }}
    <template v-slot:actions>
      <v-btn
        color="pink"
        variant="text"
        @click="close"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue, toNative, Prop } from 'vue-facing-decorator';

@Component
class SnackBarComponent extends Vue {
  @Prop()
  public value!: string;

  @Prop()
  public snackbar!: boolean;

  public close() {
    this.$emit('close-snackbar');
  }
}
export default toNative(SnackBarComponent);
</script>
