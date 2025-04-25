<template>
  <v-container fluid class="home-container">
    <v-card class="global py-6 px-4">
      <div class="d-flex justify-end" v-if="!this.isAdmin">
        <v-btn @click="this.$router.push('chat-bot')" color="transparent" rounded>
          <span>
            <v-icon>mdi-help-circle-outline</v-icon>
            Ajuda
          </span>
        </v-btn>
      </div>

      <v-row>
        <v-col cols="12">
          <div class="text-center">
            <v-card-title class="font-weight-bold">
              <h1>Painel Choris Skate Park</h1>
            </v-card-title>
            <v-card-subtitle>
              <i class="font-italic" :style="{ color: 'salmon' }">
                {{ isAdmin ? 'Administrativo' : 'Cliente' }}
              </i>
            </v-card-subtitle>
          </div>
        </v-col>
      </v-row>

      <v-row class="my-4">
        <v-col cols="12" md="6">
          <v-hover v-slot="{ hover }">
            <v-card class="info-card pa-4" :elevation="hover ? 12 : 4">
              <v-card-title class="font-weight-medium">
                {{ isAdmin ? 'Gerencie as pistas de skate' : 'Reserve sua pista e veja a disponibilidade' }}
              </v-card-title>
              <v-card-text>
                <span>Explore todas as funcionalidades disponíveis para {{ isAdmin ? 'administradores' : 'clientes' }}.</span>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>

        <v-col cols="12" md="6" class="text-center">
          <v-hover v-slot="{ hover }">
            <v-card class="info-card pa-4" :elevation="hover ? 12 : 4">
              <v-card-title class="font-weight-medium">
                Horário de Brasília
              </v-card-title>
              <v-card-text class="font-weight-bold text-primary">
                <h2>{{ timeNow }}</h2>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <v-row class="overview-section my-6" v-if="user.isAdmin">
        <v-col cols="12" md="4">
          <v-slide-y-transition>
            <v-card class="overview-card pa-4">
              <v-card-title>Total de Clientes</v-card-title>
              <v-card-text class="text-success"><h2>1,245</h2></v-card-text>
            </v-card>
          </v-slide-y-transition>
        </v-col>

        <v-col cols="12" md="4">
          <v-slide-y-transition>
            <v-card class="overview-card pa-4">
              <v-card-title>Reservas Realizadas</v-card-title>
              <v-card-text class="text-info"><h2>3,452</h2></v-card-text>
            </v-card>
          </v-slide-y-transition>
        </v-col>

        <v-col cols="12" md="4">
          <v-slide-y-transition>
            <v-card class="overview-card pa-4">
              <v-card-title>Receita Estimada</v-card-title>
              <v-card-text class="text-warning"><h2>R$ 85,620</h2></v-card-text>
            </v-card>
          </v-slide-y-transition>
        </v-col>
      </v-row>

      <v-row class="my-6" v-if="!isAdmin">
        <v-col cols="12">
          <v-card class="price-card pa-4">
            <v-card-title class="font-weight-bold">
              <v-icon>mdi-cash</v-icon>
              Tabela de Preços - Aluguel de Pistas
            </v-card-title>
            <v-divider class="my-2" />
            <v-row @click="$router.push('skate-parks')">
              <v-col cols="12" md="4">
                <v-sheet class="price-box one-hour">
                  <v-chip class="most-popular-chip" text-color="white" small>
                    Mais escolhido
                  </v-chip>
                  <v-icon size="36" color="white">mdi-timer</v-icon>
                  <div class="price-label">1 Hora</div>
                  <div class="price-value">R$ 100</div>
                </v-sheet>
              </v-col>
              <v-col cols="12" md="4">
                <v-sheet class="price-box two-hours">
                  <v-icon size="36" color="white">mdi-timer</v-icon>
                  <div class="price-label">2 Horas</div>
                  <div class="price-value">R$ 200</div>
                </v-sheet>
              </v-col>
              <v-col cols="12" md="4">
                <v-sheet class="price-box full-day">
                  <v-icon size="36" color="white">mdi-calendar-clock</v-icon>
                  <div class="price-label">Dia Todo</div>
                  <div class="price-value">R$ 500</div>
                </v-sheet>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" class="skater-container">
          <div class="skater-wrapper">
            <div class="skater-img-wrapper">
              <v-img
                :src="skateImage"
                class="skater-image"
                height="200"
                width="auto"
                contain
              />
            </div>
            <div class="skater-phrase" :style="{ color: lyricColor }">
              {{ currentLyric }}
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { mapActions } from 'vuex';
import User from '../Auth/entities/user.entity';

@Component({
  methods: {
    ...mapActions(['setIsLoading']),
  },
})
export default class Home extends Vue {
  private user: User = new User();

  private localDateNow: Date = new Date();

  public setIsLoading!: Function;

  private skateImage: string = 'https://matheusmuriel.github.io/FilosofoChorao/assets/choris.png';

  private lyrics = [
    'Livre pra poder sorrir...',
    'De skate eu vim, de skate eu vou...',
    'Dias de luta, dias de glória!',
    'Só os loucos sabem...',
    'Tamo aí na atividade!',
    'O tempo vai curar...',
    'Não deixe o mar te engolir!',
  ];

  private lyricColor = '';

  private currentLyric: string = this.lyrics[0];

  private get timeNow() {
    return this.localDateNow.toLocaleTimeString();
  }

  private get isAdmin() {
    return !!this.user.isAdmin;
  }

  private pickNewLyric() {
    const newLyric = this.lyrics[Math.floor(Math.random() * this.lyrics.length)];
    this.currentLyric = newLyric;
    this.lyricColor = this.getRandomColor();
  }

  private getRandomColor() {
    const colors = ['#ff4081', '#ffffff', '#2196f3', '#ff9800'];
    return colors[Math.floor(Math.random() * colors.length)];
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

    this.pickNewLyric();
    setInterval(() => this.pickNewLyric(), 2000);
  }
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
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

.skater-container {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.skater-wrapper {
  position: absolute;
  display: flex;
  align-items: center;
  animation: skateLoop 10s ease-in-out infinite;
}

.skater-img-wrapper {
  animation: flipSkater 10s ease-in-out infinite;
}

.skater-image {
  height: 200px;
  width: auto;
}

.skater-phrase {
  font-size: 2rem;
  font-weight: bold;
  color: #ff4081;
  white-space: nowrap;
  animation: floatText 2s ease-in-out infinite;
}

.most-popular-chip {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  font-size: 0.75rem;
  padding: 2px 10px;
  font-weight: bold;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
}

.price-box {
  position: relative;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  transition: transform 0.2s;
}


@keyframes skateLoop {
  0% {
    left: -300px;
  }
  50% {
    left: 100%;
  }
  100% {
    left: -300px;
  }
}

@keyframes flipSkater {
  0% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(1);
  }
  50.01% {
    transform: scaleX(-1);
  }
  100% {
    transform: scaleX(-1);
  }
}

@keyframes floatText {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

.price-card {
  background: #212121;
  border-radius: 12px;
  color: #fff;
  box-shadow: 0 4px 14px rgba(0,0,0,0.2);
}

.price-box {
  cursor: pointer;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  transition: transform 0.2s;
}

.price-box:hover {
  transform: translateY(-4px);
}

.one-hour {
  background: 	#90ee90;
}

.two-hours {
  background: #03dac6;
}

.full-day {
  background: #ffb300;
}

.price-label {
  font-size: 1.1rem;
  margin-top: 6px;
}

.price-value {
  font-size: 1.5rem;
  margin-top: 4px;
}
</style>
