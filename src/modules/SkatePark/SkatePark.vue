<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class SkatePark extends Vue {}
</script>
