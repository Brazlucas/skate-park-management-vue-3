<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" md="12">
            <v-card>
              <v-card-title class="headline">
                Alugar Pista: "{{ skatePark.name }}"
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-form ref="rentalForm">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="user.name"
                        label="Nome do Usuário"
                        outlined
                        dense
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-menu
                        v-model="startDatePicker"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="formattedStartDate"
                            label="Data de Início"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            dense
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="rental.startDate"
                          @input="startDatePicker = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-menu
                        v-model="endDatePicker"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="formattedEndDate"
                            label="Data Final"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            dense
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="rental.endDate"
                          @input="endDatePicker = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between">
                <v-btn color="secondary" @click="goBack" rounded>
                  <v-icon left>mdi-arrow-left</v-icon> Voltar
                </v-btn>
                <v-btn
                  color="primary"
                  :loading="loading"
                  @click="submitRental"
                  rounded
                >
                  <v-icon left>mdi-calendar-check</v-icon> Confirmar Aluguel
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
    endDate: '',
  };
  public loading: boolean = false;

  private $router: any;

  private get formattedStartDate() {
    return this.rental.startDate
      ? new Date(this.rental.startDate).toLocaleDateString()
      : '';
  }

  private get formattedEndDate() {
    return this.rental.endDate
      ? new Date(this.rental.endDate).toLocaleDateString()
      : '';
  }

  private getSelectedSkatePark() {
    const routeParams: any = useRoute().params.id;
    skateParkService
      .getById(routeParams)
      .then((response: any) => {
        this.skatePark = new SkatePark(response);
      })
      .catch((err) => console.error(err));
  }

  private submitRental() {
    if (!this.rental.startDate || !this.rental.endDate) {
      // Adicione lógica para exibir mensagens de erro apropriadas
      return;
    }
    this.loading = true;
    // Lógica para submeter o aluguel
    console.log('Aluguel confirmado:', this.rental);
    this.loading = false;
  }

  private goBack() {
    this.$router.go(-1);
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

<style scoped>
.headline {
  font-size: 1.5rem;
  font-weight: bold;
}

.v-btn {
  text-transform: none;
}
</style>
