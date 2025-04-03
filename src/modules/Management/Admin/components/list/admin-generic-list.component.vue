<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="12">
            <v-card>
              <v-card-title class="headline d-flex justify-space-between">
                {{ item.module }}
              </v-card-title>
              <v-card-subtitle></v-card-subtitle>
              <v-divider></v-divider>
              <v-data-table
                :items="items"
              ></v-data-table>
              <v-card-actions class="d-flex justify-space-between">
                <v-btn color="secondary" @click="goBack" rounded>
                  <v-icon left>mdi-arrow-left</v-icon> Voltar
                </v-btn>
                <v-btn v-if="item.module !== 'Aluguéis'" color="primary" :loading="loading" @click="goToCreate" rounded>
                  <v-icon left>mdi-plus</v-icon> Criar {{ item.module }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import rentalService from '@/modules/Rental/services/rental.service';
import locationService from '@/modules/SkatePark/services/location.service';
import skateParkService from '@/modules/SkatePark/services/skate-park.service';
import userService from '@/modules/User/services/user.service';
import { Component, Vue } from 'vue-facing-decorator';
import { mapActions } from 'vuex';

@Component({
  methods: {
    ...mapActions(['setIsLoading']),
  },
})
export default class AdminGenericList extends Vue {
  private item: any = {};

  private $router: any;

  private items: any[] = [];

  public setIsLoading!: Function;

  private async onListEnter() {
    this.setIsLoading(true);

    switch (this.item.module) {
      case 'Usuários':
        await userService.getUsers().then((response) => {
          this.items = response;
        }).catch((error) => {
          console.error('Error fetching users:', error);
        }).finally(() => {
          this.setIsLoading(false);
        });
        break;
      case 'Pistas':
        await skateParkService.getAll().then((response) => {
          this.items = response;
        }).catch((error) => {
          console.error('Error fetching skate parks:', error);
        }).finally(() => {
          this.setIsLoading(false);
        });
        break;
      case 'Aluguéis':
        await rentalService.getAll().then((response) => {
          this.items = response;
        }).catch((error) => {
          console.error('Error fetching rentals:', error);
        }).finally(() => {
          this.setIsLoading(false);
        });
        break;
      case 'Localizações':
        await locationService.getAll().then((response) => {
          this.items = response;
        }).catch((error) => {
          console.error('Error fetching locations:', error);
        }).finally(() => {
          this.setIsLoading(false);
        });
        break;
      default:
        break;
    }
  }

  private goBack() {
    this.$router.go(-1);
  }

  private goToCreate() {
    let targetRoute = '';

    switch (this.item.module) {
      case 'Usuários':
        targetRoute = 'user-form-create';
        break;
      case 'Pistas':
        targetRoute = 'skate-park-form';
        break;
      // case 'Aluguéis':
      //   targetRoute = 'rental-create';
      //   break;
      case 'Localizações':
        targetRoute = 'location-form';
        break;
      default:
        break;
    }

    this.$router.push({ name: targetRoute });
  }

  private created() {
    this.item = JSON.parse(localStorage.getItem('module') || '')
    this.onListEnter();
  }
}
</script>

<style scoped>
.headline {
  font-size: 1.5rem;
  font-weight: bold;
}

.v-btn {
  text-transform: none;
}
</style>
