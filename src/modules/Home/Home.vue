<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12">
        <ul>
          <li><router-link to="/rentals">Alugar uma pista</router-link></li>
          <li><router-link to="/skate-parks">Pistas de skate</router-link></li>
          <li v-if="isAdmin"><router-link to="/home">Painel do administrador</router-link></li>
        </ul>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import User from '../Auth/entities/user.entity';

@Component
class Home extends Vue {
  private user: User = new User();

  private get isAdmin() {
    return !!this.user.isAdmin;
  }

  private mounted() {
    const userInfo = localStorage.getItem('user-info');
    if (userInfo) {
      const localStorageUser = JSON.parse(userInfo);
      this.user = localStorageUser;
    }
  }
}
export default toNative(Home);
</script>
