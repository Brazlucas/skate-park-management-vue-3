<template>
  <v-snackbar v-model="dialog" timeout="2000" :timer="type === 'success' ? 'green' : 'red'">
    {{ value }}
    <template v-slot:actions>
      <v-btn
        :color="type === 'success' ? 'green' : 'red'"
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

  @Prop()
  public type!: string;

  public dialog: boolean = false;

  private beforeUpdate() {
    this.dialog = this.snackbar;
  }

  public close() {
    this.$emit('close-snackbar');
  }
}
export default toNative(SnackBarComponent);
</script>
