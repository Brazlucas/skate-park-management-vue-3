<template>
  <v-container fluid>
    <v-card>
      <v-card class="skate-park-list">
        <v-card-title class="headline font-weight-bold">
          Pistas de Skate <v-icon color="lighten-2">mdi-skateboard</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <template v-if="skateParks.length > 0">
          <v-row>
            <v-col v-for="skatePark in skateParks" :key="skatePark.id" cols="12" md="6">
              <v-card class="skate-card-item">
                <v-img :src="skatePark.image || 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'" height="500px" />
                <v-card-title class="skate-title">{{ skatePark.name }}</v-card-title>
                <v-card-subtitle class="skate-location">📍 {{ skatePark.location }}</v-card-subtitle>
                <v-card-text class="skate-description">{{ skatePark.description }}</v-card-text>
                <v-card-actions>
                  <router-link :to="`/rent/${skatePark.id}`" class="reserve-link" v-if="!skatePark.rented">
                    <v-btn class="reserve-btn" rounded>
                      <v-icon left>mdi-calendar-plus</v-icon> Reservar
                    </v-btn>
                  </router-link>
                  <router-link :to="`/rented/${skatePark.rentals.map((r) => r.id)}`" class="reserve-link" v-if="skatePark.rented">
                    <v-btn class="reserved-btn" rounded>Ver aluguel</v-btn>
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
    </v-card>
  </v-container>
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
.skate-park-container {
  min-height: 100vh;
  background-color: #121212;
  padding-top: 32px;
}

.skate-park-list {
  background-color: transparent;
  backdrop-filter: blur(6px);
  border-radius: 12px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  color: #00bcd4;
  margin-bottom: 24px;
}

.skate-card-item {
  background: #1e1e1e;
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.3s ease-in-out;
}

.skate-card-item:hover {
  box-shadow: 0 8px 16px rgba(0,0,0,0.4);
}

.skate-title {
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
}

.skate-location {
  font-size: 15px;
  color: #9e9e9e;
  margin-top: -8px;
}

.skate-description {
  font-size: 14px;
  color: #cfcfcf;
  margin-top: 8px;
  height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.reserve-link {
  text-decoration: none;
  width: 100%;
}

.reserve-btn, .reserved-btn {
  width: 100%;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  padding: 10px;
  text-transform: none;
  box-shadow: none;
}

.reserve-btn {
  background: #03dac6;
  color: #000;
}

.reserve-btn:hover {
  background: #00cbb0;
}

.reserved-btn {
  background: #fbc02d;
  color: #000;
}

.reserved-btn:hover {
  background: #f9a825;
}

.empty-message {
  font-size: 18px;
  color: #ccc;
  text-align: center;
}
</style>
