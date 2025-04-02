<template>
  <v-container class="home-container">
    <v-card class="global py-6 px-4">
      <v-row>
        <v-col cols="12" class="text-center">
          <v-card-title class="text-h4 font-weight-bold">
            Painel Choris Skate Park
          </v-card-title>
          <v-card-subtitle class="text-subtitle-1">
            <i class="font-italic" :style="{ color: 'salmon' }">
              {{ isAdmin ? 'Administrativo' : 'Cliente' }}
            </i>
          </v-card-subtitle>
        </v-col>
      </v-row>

      <v-row class="my-4">
        <v-col cols="12" md="6">
          <v-hover v-slot="{ hover }">
            <v-card class="info-card pa-4" :elevation="hover ? 12 : 4">
              <v-card-title class="text-h5 font-weight-medium">
                {{ isAdmin ? 'Gerencie as pistas de skate' : 'Reserve sua pista e veja a disponibilidade' }}
              </v-card-title>
              <v-card-text class="text-body-1">
                Explore todas as funcionalidades disponíveis para {{ isAdmin ? 'administradores' : 'clientes' }}.
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>

        <v-col cols="12" md="6" class="text-center">
          <v-hover v-slot="{ hover }">
            <v-card class="info-card pa-4" :elevation="hover ? 12 : 4">
              <v-card-title class="text-h5 font-weight-medium">
                Horário de Brasília
              </v-card-title>
              <v-card-text class="text-body-1 font-weight-bold text-primary">
                {{ timeNow }}
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <v-row class="overview-section my-6" v-if="user.isAdmin">
        <v-col cols="12" md="4">
          <v-slide-y-transition>
            <v-card class="overview-card pa-4">
              <v-card-title class="text-h6 font-weight-bold">Total de Clientes</v-card-title>
              <v-card-text class="text-h5 text-success">1,245</v-card-text>
            </v-card>
          </v-slide-y-transition>
        </v-col>
        
        <v-col cols="12" md="4">
          <v-slide-y-transition>
            <v-card class="overview-card pa-4">
              <v-card-title class="text-h6 font-weight-bold">Reservas Realizadas</v-card-title>
              <v-card-text class="text-h5 text-info">3,452</v-card-text>
            </v-card>
          </v-slide-y-transition>
        </v-col>
        
        <v-col cols="12" md="4">
          <v-slide-y-transition>
            <v-card class="overview-card pa-4">
              <v-card-title class="text-h6 font-weight-bold">Receita Estimada</v-card-title>
              <v-card-text class="text-h5 text-warning">R$ 85,620</v-card-text>
            </v-card>
          </v-slide-y-transition>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" md="10">
          <v-img height="500" contain :src="skateImage"></v-img>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import { mapActions } from 'vuex';
import User from '../Auth/entities/user.entity';

@Component({
  methods: {
    ...mapActions(['setIsLoading']),
  },
})
class Home extends Vue {
  private user: User = new User();
  private localDateNow: Date = new Date();
  public setIsLoading!: Function;
  private skateImage: string = 'https://matheusmuriel.github.io/FilosofoChorao/assets/choris.png';

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
      this.user = JSON.parse(userInfo);
    }
    this.setIsLoading(false);
  }
}
export default toNative(Home);
</script>

<style lang="sass" scoped>
.home-container {
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.global {
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.info-card {
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
}

.overview-card {
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease-in-out;
}

.overview-card:hover {
  transform: translateY(-5px);
}
</style>
