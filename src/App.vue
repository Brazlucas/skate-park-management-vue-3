<template>
  <v-app>
    <section class="app-grid">
      <div class="app-content">
        <v-main>
          <v-container class="pa-0" fluid>
            <router-view />
          </v-container>
        </v-main>
      </div>
    </section>
  </v-app>
</template>

<!-- Código abaixo talvez será utilizado. -->
<!-- <script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';

@Component
class App extends Vue { }
export default toNative(App);
</script> -->

<style lang="scss">
.app-grid {
  display: flex;
}

.app-menu {
  width: auto;
}
.app-content {
  padding: 30px 50px 50px;
  width: 100%;
}
</style>
