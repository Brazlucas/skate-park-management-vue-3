<template>
  <v-card class="home">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card-title class="home__content__card__title">Bem-vindo(a) ao Choris Skate Park</v-card-title>
        <v-card-subtitle class="home__content__card__subtitle">Aqui você pode reservar uma pista de skate, <br> ver as pistas disponíveis e muito mais!</v-card-subtitle>
        <v-img height="400" src="https://matheusmuriel.github.io/FilosofoChorao/assets/choris.png"></v-img>
      </v-col>
    </v-row>
  </v-card>
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

<style lang="sass" scoped>
.home {
  background-image: url('https://images5.alphacoders.com/135/thumb-1920-1351029.png');
  background-blend-mode: soft-light;
  background-size: cover;
  background-position: center;
  height: 700px;
  &__content {
    &__card {
      &__title {
        font-size: 2rem;
        background-color: rgba(0, 0, 0, 0.5);
        outline: 1px solid grey;
        font-weight: bold;
        margin-bottom: 1rem;
      }
      &__subtitle {
        text-shadow: 2px 2px 2px black;
        font-size: 1.5rem;
        color: white;
        opacity: 1;
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
