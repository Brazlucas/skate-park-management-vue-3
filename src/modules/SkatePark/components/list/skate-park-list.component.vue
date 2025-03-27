<template>
  <v-container class="dark-theme">
    <v-card class="skate-card">
      <v-card-title class="title">
        Pistas de Skate <v-icon color="light-blue lighten-2">mdi-skateboard</v-icon>
      </v-card-title>

      <template v-if="skatePark.id">
        <v-col cols="12" v-if="!listView">
          <v-carousel hide-delimiters height="600" hide-delimiter-background>
            <v-carousel-item
              v-for="skatePark in skateParks"
              :key="skatePark.id"
              src="https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_xl_2x/f_auto/primary/h3kyw7djb4sky6dpn7ui"
              class="carousel-item"
            >
              <div class="carousel-info">
                <v-list-item-content>
                  <v-list-item-title class="skate-title">
                    {{ skatePark.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="skate-location">
                    📍 {{ skatePark.location }}
                  </v-list-item-subtitle>
                  <p class="skate-description">{{ skatePark.description }}</p>
                </v-list-item-content>
                <router-link v-if="!user.isAdmin" :to="`/rent/${skatePark.id}`" class="reserve-link">
                  <v-btn class="reserve-btn">
                    Reservar
                  </v-btn>
                </router-link>
              </div>
            </v-carousel-item>
          </v-carousel>

          <v-row justify="center" class="mt-5">
            <v-btn v-if="user.isAdmin" color="red" class="delete-btn" rounded @click="deleteSkatePark(skatePark.id)">
              Excluir Pista
            </v-btn>
          </v-row>
        </v-col>
      </template>

      <template v-else>
        <v-row no-gutters>
          <v-col cols="12" class="d-flex justify-center mt-15">
            <v-card-title class="empty-message">
              Nenhuma pista de skate cadastrada 😕
            </v-card-title>
          </v-col>
        </v-row>
      </template>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import skateParkService from '@/modules/SkatePark/services/skate-park.service';
import User from '@/modules/Auth/entities/user.entity';
import SkatePark from '../../entities/skate-park.entity';

@Component
class SkateParkListComponent extends Vue {
  private skateParks: SkatePark[] = [];
  private user: User = new User();
  private skatePark: SkatePark = new SkatePark();
  private listView: boolean = false;

  private changeListView() {
    this.listView = !this.listView;
  }

  private getAllSkateParks() {
    skateParkService.getAll()
      .then((response: any[]) => {
        this.skateParks = response;
        this.skateParks.map((item: SkatePark) => {
          this.skatePark = new SkatePark(item);
        });
      })
      .catch((err) => console.error(err));
  }

  private deleteSkatePark(id: number) {
    skateParkService.delete(id.toString())
      .then(() => this.getAllSkateParks())
      .catch((err) => console.error(err));
  }

  private created() {
    this.getAllSkateParks();
  }

  private mounted() {
    const userInfo = localStorage.getItem('user-info');
    if (userInfo) {
      this.user = JSON.parse(userInfo);
    }
  }
}
export default toNative(SkateParkListComponent);
</script>

<style scoped>
/* Tema Dark */
.dark-theme {
  background: url('https://i.ytimg.com/vi/Flii4YJEjCc/maxresdefault.jpg') no-repeat center center fixed;
  background-size: cover;
  color: #fff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  backdrop-filter: blur(8px); /* Efeito de blur no fundo */
}

.skate-card {
  background: rgba(28, 28, 28, 0.8); /* Fundo semitransparente */
  padding: 24px;
  border-radius: 12px;
  width: 100%;
  max-width: 1000px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.4); /* Sombra mais forte */
}

.title {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  color: #bb86fc;
}

.carousel-item {
  border-radius: 8px;
}

.carousel-info {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  max-width: 500px;
}

.skate-title {
  font-size: 22px;
  font-weight: bold;
  color: #ffb74d;
}

.skate-location {
  font-size: 16px;
  color: #e0e0e0;
}

.skate-description {
  font-size: 14px;
  color: #bdbdbd;
  margin-top: 10px;
}

.reserve-link {
  text-decoration: none;
  display: block;
  margin-top: 10px;
}

.reserve-btn {
  background: #03dac6;
  color: #000;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 8px;
  transition: 0.3s;
}

.reserve-btn:hover {
  background: #00bfa5;
}

.delete-btn {
  background: #cf6679;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 8px;
  transition: 0.3s;
}

.delete-btn:hover {
  background: #b00020;
}

.empty-message {
  font-size: 18px;
  color: #888;
  text-align: center;
  margin-top: 20px;
}
</style>
