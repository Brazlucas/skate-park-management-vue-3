<template>
  <v-app-bar :elevation="2" v-if="componentIsMounted" class="header">
    <!-- <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template> -->

    <v-app-bar-title>
      <v-img src="https://i.postimg.cc/YqssJ92z/logo-compactada.png" width="150" height="200"></v-img>
    </v-app-bar-title>

    <v-app-bar-subtitle>
      <h1>Bem-vindo(a)</h1>
      <h1>Agora são: {{ timeNow }}</h1>
    </v-app-bar-subtitle>

    <v-btn @click="logout"><v-icon icon>mdi-close</v-icon></v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import User from '@/modules/Auth/entities/user.entity';
import authService from '@/modules/Auth/services/auth.service';

@Component
class HeaderComponent extends Vue {
  private user: User = new User();

  private localDateNow: Date = new Date();

  private componentIsMounted: boolean = false;

  private get timeNow() {
    return this.localDateNow.toLocaleTimeString();
  }

  private updateClock() {
    this.localDateNow = new Date();
  }

  private logout() {
    authService.logout();
  }

  private created() {
    const userInfo = localStorage.getItem('user-info');

    if (userInfo) {
      const localStorageUser = JSON.parse(userInfo);

      this.user = localStorageUser;
    }
  }

  private mounted() {
    window.setInterval(this.updateClock, 1000);
    this.componentIsMounted = true;
  }
}
export default toNative(HeaderComponent);
</script>

<style lang="sass" scoped>
.header {
  padding: 15px;
 }
</style>