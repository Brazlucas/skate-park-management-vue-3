<template>
  <v-app class="skate-park-container">
    <v-main>
      <v-container fluid>
        <v-card class="skate-park-list py-6 px-4">
          <v-card-title class="title text-h4 font-weight-bold">
            Pistas de Skate <v-icon color="light-blue lighten-2">mdi-skateboard</v-icon>
          </v-card-title>

          <template v-if="skateParks.length > 0">
            <v-row>
              <v-col v-for="skatePark in skateParks" :key="skatePark.id" cols="12" md="6">
                <v-card class="skate-card-item">
                  <v-img :src="skatePark.image || 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'" height="200px" />
                  <v-card-title class="skate-title">{{ skatePark.name }}</v-card-title>
                  <v-card-subtitle class="skate-location">📍 {{ skatePark.location }}</v-card-subtitle>
                  <v-card-text class="skate-description">{{ skatePark.description }}</v-card-text>
                  <v-card-actions>

                    <router-link :to="`/rent/${skatePark.id}`" class="reserve-link">
                      <v-btn class="reserve-btn" rounded v-if="!skatePark.rented">Reservar</v-btn>
                    </router-link>

                    <router-link :to="`/rented/${skatePark.rentals.map((r) => r.id)}`" class="reserve-link">
                      <v-btn class="reserved-btn" rounded v-if="skatePark.rented">Ver aluguel</v-btn>
                    </router-link>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
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
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import { mapActions } from 'vuex';
import skateParkService from '@/modules/SkatePark/services/skate-park.service';
import User from '@/modules/Auth/entities/user.entity';
import SkatePark from '../../entities/skate-park.entity';

@Component({
  methods: {
    ...mapActions(['setIsLoading']),
  },
})
class SkateParkListComponent extends Vue {
  private skateParks: SkatePark[] = [];

  private user: User = new User();

  private listView: boolean = false;

  public setIsLoading!: Function;

  private changeListView() {
    this.listView = !this.listView;
  }

  private getAllSkateParks() {
    this.setIsLoading(true);

    skateParkService.getAll()
      .then((response: any[]) => {
        this.skateParks = response.map(item => new SkatePark(item));
      })
      .catch((err) => console.error(err))
      .finally(() => this.setIsLoading(false));
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
.skate-park-list {
  background-image: url('https://i.ytimg.com/vi/Flii4YJEjCc/maxresdefault.jpg');
}

.skate-park-container {
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.skate-card {
  padding: 24px;
  border-radius: 12px;
  width: 100%;
  max-width: 1000px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  color: #bb86fc;
}

.skate-card-item {
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 12px;
  overflow: hidden;
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
  color: #fff;
  font-weight: bold;
  padding: 10px 20px;
  transition: 0.3s;
}

.reserved-btn {
  background: #ffb74d;
  color: #fff;
  font-weight: bold;
  padding: 10px 20px;
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
