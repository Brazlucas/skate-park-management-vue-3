<template>
  <div v-if="isLoading" class="loader-overlay">
    <v-progress-circular
      :size="50"
      color="red"
      indeterminate
      :width="5"
    ></v-progress-circular>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapGetters } from 'vuex';

@Options({
  computed: {
    ...mapGetters(['isLoading']),
  },
})
export default class Loader extends Vue {
  public isLoading!: Function;
}
</script>

<style lang="sass">
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
