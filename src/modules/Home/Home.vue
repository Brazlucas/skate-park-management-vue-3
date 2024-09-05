<template>
  <v-card class="global">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card-title class="global__content__card__title">
          Painel Choris Skate Park
          <i style="color: salmon">
            '{{ isAdmin ? 'Administrativo' : 'Cliente' }}
          </i>
        </v-card-title>
        <div class="d-flex justify-space-between">
          <v-card-subtitle class="global__content__card__subtitle">
            {{ isAdmin ? 'Adicione, gerencie uma pista de skate' : 'Reserve uma pista de skate, veja as pistas disponíveis'}}
            <br> e muito mais!
          </v-card-subtitle>
          <v-card-subtitle class="global__content__card__subtitle">
            Horário de brasília: {{ timeNow }}
          </v-card-subtitle>
        </div>
        <v-img height="400" src="https://matheusmuriel.github.io/FilosofoChorao/assets/choris.png"></v-img>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import { mapActions } from 'vuex';
import User from '../Auth/entities/user.entity';

@Component({
  methods: {
    ...mapActions([
      'setIsLoading'
    ]),
  }
})
class Home extends Vue {
  private user: User = new User();

  private localDateNow: Date = new Date();

  public setIsLoading!: Function;

  private get timeNow() {
    return this.localDateNow.toLocaleTimeString();
  }

  private get isAdmin() {
    return !!this.user.isAdmin;
  }

  private updateClock() {
    this.localDateNow = new Date();
  }

  private mounted() {
    window.setInterval(this.updateClock, 1000);
    const userInfo = localStorage.getItem('user-info');
    if (userInfo) {
      const localStorageUser = JSON.parse(userInfo);
      this.user = localStorageUser;
    }
    this.setIsLoading(false);
  }
}
export default toNative(Home);
</script>

<style lang="sass" scoped>
</style>
