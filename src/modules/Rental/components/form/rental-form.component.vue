<template>
  <v-card class="global-form">
    <v-row no-gutters class="d-flex justify-center">
      <v-col cols="12">
        <v-card-title class="global__content__card__title d-flex justify-space-between">
          <span>Aluguel de "{{ skatePark.name }}"</span>
          <span><v-icon color="green">mdi-currency-usd</v-icon></span>
        </v-card-title>
        <v-card-subtitle class="global__content__card__subtitle">
          Preencha os dados abaixo para o aluguel da pista
        </v-card-subtitle>
      </v-col>
      <v-col cols="9" class="ml-5 mt-15">
        <div class="text-subtitle-1 text-medium-emphasis">Nome</div>
        <v-text-field
          density="compact"
          placeholder="Nome do usuário"
          variant="outlined"
          type="email"
          v-model="user.name"
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="6" class="ml-5">
        <div class="text-subtitle-1 text-medium-emphasis">Data de ínicio</div>
        <v-date-picker
        ></v-date-picker>
      </v-col>
      <v-col cols="2" class="ml-5">
        <div class="text-subtitle-1 text-medium-emphasis">Data final</div>
        <v-date-picker
        ></v-date-picker>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import { useRoute } from 'vue-router';
import skateParkService from '@/modules/SkatePark/services/skate-park.service';
import SkatePark from '@/modules/SkatePark/entities/skate-park.entity';
import User from '@/modules/Auth/entities/user.entity';

@Component
class RentalFormComponent extends Vue {
  // private rental: Rental = new Rental();

  private skatePark: SkatePark = new SkatePark();

  private routeParams: any = '';

  private user: User = new User();

  private getSelectedSkatePark() {
    skateParkService.getById(this.routeParams)
      .then((response: any) => {
        this.skatePark = new SkatePark(response);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log('finally');
      });
  }

  private created() {
    this.routeParams = useRoute().params.id;
    this.getSelectedSkatePark();
  }

  private mounted() {
    const userInfo = localStorage.getItem('user-info');
    if (userInfo) {
      const localStorageUser = JSON.parse(userInfo);
      this.user = localStorageUser;
    }
  }
}
export default toNative(RentalFormComponent);
</script>