<template>
  <v-row no-gutters>
    <v-col cols="6">
      <div class="home">
        <h1>CHORIS SKATE PARK</h1>
      </div>
    </v-col>
    <v-col cols="6">
      <div class="home">
        <h1>Bem-vindo(a) {{ user.name }}</h1>
        <h1>Agora são: {{ timeNow }}</h1>
      </div>
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col cols="12">
      <ul>
        <li><router-link to="/rentals">Alugar uma pista</router-link></li>
        <li><router-link to="/skate-parks">Pistas de skate</router-link></li>
        <li v-if="isAdmin"><router-link to="/home">Painel do administrador</router-link></li>
        <v-btn @click="logout">Deslogar</v-btn>
      </ul>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import User from '../Auth/entities/user.entity';
import authService from '../Auth/services/auth.service';

@Component
class Home extends Vue {
  private user: User = new User();

  private get isAdmin() {
    return !!this.user.isAdmin;
  }

  private localDateNow: Date = new Date();

  private logout() {
    authService.logout();
  }

  private get timeNow() {
    return this.localDateNow.toLocaleTimeString();
  }

  private updateClock() {
    this.localDateNow = new Date();
  }

  private mounted() {
  const userInfo = localStorage.getItem('user-info');
    if (userInfo) {
      const localStorageUser = JSON.parse(userInfo);
      this.user = localStorageUser;
    }

    window.setInterval(this.updateClock, 1000);
  }
}
export default toNative(Home);
</script>
