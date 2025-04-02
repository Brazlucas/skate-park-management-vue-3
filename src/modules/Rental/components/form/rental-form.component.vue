<template>
  <v-container class="rental-container">
    <v-card class="global-form pa-6">
      <v-card-title class="text-h5 font-weight-bold d-flex justify-space-between">
        Aluguel de "{{ skatePark.name }}"
        <v-icon color="green">mdi-currency-usd</v-icon>
      </v-card-title>
      
      <v-card-subtitle class="text-subtitle-1 mt-2">
        Preencha os dados abaixo para o aluguel da pista
      </v-card-subtitle>
      
      <v-form ref="rentalForm" class="mt-4">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              label="Nome do usuário"
              variant="outlined"
              v-model="user.name"
              disabled
            ></v-text-field>
          </v-col>
          
          <v-col cols="12" md="3">
            <v-menu v-model="startDatePicker" transition="scale-transition" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formattedStartDate"
                  label="Data de início"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="rental.startDate" @input="startDatePicker = false"></v-date-picker>
            </v-menu>
          </v-col>
          
          <v-col cols="12" md="3">
            <v-menu v-model="endDatePicker" transition="scale-transition" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formattedEndDate"
                  label="Data final"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="rental.endDate" @input="endDatePicker = false"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        
        <v-btn color="primary" block class="mt-4" @click="submitRental">
          Confirmar Aluguel
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import { useRoute } from 'vue-router';
import skateParkService from '@/modules/SkatePark/services/skate-park.service';
import SkatePark from '@/modules/SkatePark/entities/skate-park.entity';
import User from '@/modules/Auth/entities/user.entity';

@Component
class RentalFormComponent extends Vue {
  private skatePark: SkatePark = new SkatePark();
  private user: User = new User();
  private startDatePicker = false;
  private endDatePicker = false;
  private rental = {
    startDate: '',
    endDate: ''
  };

  private get formattedStartDate() {
    return this.rental.startDate ? new Date(this.rental.startDate).toLocaleDateString() : '';
  }

  private get formattedEndDate() {
    return this.rental.endDate ? new Date(this.rental.endDate).toLocaleDateString() : '';
  }

  private getSelectedSkatePark() {
    const routeParams: any = useRoute().params.id;
    skateParkService.getById(routeParams)
      .then((response: any) => {
        this.skatePark = new SkatePark(response);
      })
      .catch(err => console.error(err));
  }

  private submitRental() {
    console.log('Aluguel confirmado:', this.rental);
  }

  private created() {
    this.getSelectedSkatePark();
  }

  private mounted() {
    const userInfo = localStorage.getItem('user-info');
    if (userInfo) {
      this.user = JSON.parse(userInfo);
    }
  }
}
export default toNative(RentalFormComponent);
</script>

<style lang="sass" scoped>
.rental-container {
  justify-content: center;
  align-items: center;
  min-height: 100vh ;
}

.global-form {
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
