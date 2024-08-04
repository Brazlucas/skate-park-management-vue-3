<template>
  <div>
    Rental List
  </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';

@Component
class RentalListComponent extends Vue {}
export default toNative(RentalListComponent);
</script>