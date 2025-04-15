<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card>
          <v-card-title class="headline">
            Detalhes do Aluguel: "{{ skatePark.name }}"
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Nome do Usuário"
                  v-model="rental.renter_name"
                  outlined
                  dense
                  disabled
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  label="Data"
                  v-model="formattedDate"
                  outlined
                  dense
                  disabled
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  label="Hora de Início"
                  v-model="startHour"
                  outlined
                  dense
                  disabled
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  label="Hora de Término"
                  v-model="endHour"
                  outlined
                  dense
                  disabled
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="d-flex justify-space-between">
            <v-btn color="error" @click="cancelRental" rounded>
              <v-icon left>mdi-cancel</v-icon> Cancelar Aluguel
            </v-btn>
            <v-btn color="primary" @click="goBack" rounded>
              <v-icon left>mdi-arrow-left</v-icon> Voltar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { mapActions } from 'vuex';
import { useRoute } from 'vue-router';
import rentalService from '@/modules/Rental/services/rental.service';
import skateParkService from '@/modules/SkatePark/services/skate-park.service';
import SkatePark from '@/modules/SkatePark/entities/skate-park.entity';
import { formatDate, formatTime} from '@/utils/date';

@Component({
  methods: {
    ...mapActions(['setIsLoading']),
  },
})
export default class RentedFormComponent extends Vue {
  private rental: any = {};

  private skatePark: SkatePark = new SkatePark();

  private $router: any;

  public setIsLoading!: Function;

  public get formattedDate(): string {
    if (!this.rental.start_time) return '';
    return formatDate(this.rental.start_time);
  }

  public get startHour(): string {
    if (!this.rental.start_time) return '';
    return formatTime(this.rental.start_time);
  }

  public get endHour(): string {
    if (!this.rental.end_time) return '';
    return formatTime(this.rental.end_time);
  }

  private goBack() {
    this.$router.go(-1);
  }

  private async cancelRental() {
    const confirmed = confirm('Tem certeza que deseja cancelar este aluguel? A data será liberada para outro usuário.');

    if (!confirmed) return;

    try {
      await rentalService.delete(this.rental.id);
      this.$router.push('/alugueis');
      this.$snackbar('Aluguel cancelado com sucesso', 'success');
    } catch (e) {
      this.$snackbar('Erro ao cancelar o aluguel', 'error');
      alert('Erro ao cancelar. Tente novamente.');
    }
  }

  private async created() {
    this.setIsLoading(true);

    const route = useRoute();
    const id = route.params.id;

    try {
      const rentalData = await rentalService.getById(Number(id));
      this.rental = rentalData;

      const skateParkData = await skateParkService.getById(rentalData.skate_park_id);
      this.skatePark = new SkatePark(skateParkData);
    } catch (err) {
      this.$snackbar('Erro ao carregar os dados do aluguel', 'error');
    } finally {
      this.setIsLoading(false);
    }
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
