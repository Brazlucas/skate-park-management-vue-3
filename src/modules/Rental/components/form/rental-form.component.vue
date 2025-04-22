<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card>
          <v-card-title class="headline">
            Alugar Pista: "{{ skatePark.name }}"
          </v-card-title>
          <v-divider></v-divider>

          <v-col cols="12">
            <v-img
              :src="skatePark.image"
              max-height="500"
              max-width="100%"
              class="my-2"
              cover
            ></v-img>
          </v-col>
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
                  />
                </v-col>

                <v-col cols="12" md="3">
                  <v-menu
                    v-model="datePicker"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                  >
                    <template #activator="{ props }">
                      <v-text-field
                        v-bind="props"
                        v-model="formattedDate"
                        label="Data"
                        prepend-icon="mdi-calendar"
                        readonly
                        outlined
                        dense
                      />
                    </template>
                    <v-card>
                      <v-date-picker
                        v-model="rental.date"
                        @update:model-value="onDateSelected"
                        color="primary"
                      >
                        <template #actions>
                          <v-btn text @click="datePicker = false">OK</v-btn>
                        </template>
                      </v-date-picker>
                    </v-card>
                  </v-menu>
                </v-col>

                <v-col cols="12" md="3">
                  <v-select
                    v-model="rental.startHour"
                    :items="availableHours"
                    label="Hora de Início"
                    outlined
                    dense
                    prepend-icon="mdi-clock-outline"
                    @update:model-value="rental.duration = null"
                  />
                </v-col>

                <v-col cols="12">
                  <v-select
                    v-model="rental.duration"
                    :items="availableDurations"
                    item-title="text"
                    item-value="value"
                    label="Duração"
                    outlined
                    dense
                    prepend-inner-icon="mdi-timer-outline"
                    :disabled="!rental.startHour"
                  />
                </v-col>

              </v-row>
              <v-row>
                <v-col>
                  <v-alert
                    v-if="rental.startHour && rental.duration"
                    type="info"
                    color="green"
                    class="mt-3"
                    icon="mdi-calendar-check"
                  >
                    <div>
                      Valor do Aluguel: R$ {{
                        rental.duration === 'day'
                          ? '500,00'
                          : rental.duration === '1h'
                          ? '100,00'
                          : '200,00'
                      }}
                    </div>
                  </v-alert>
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
              :disabled="!rental.date || !rental.startHour || !rental.duration"
              rounded
            >
              <v-icon left>mdi-calendar-check</v-icon> Confirmar Aluguel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import { useRoute } from 'vue-router';
import skateParkService from '@/modules/SkatePark/services/skate-park.service';
import rentalService from '@/modules/Rental/services/rental.service';
import SkatePark from '@/modules/SkatePark/entities/skate-park.entity';
import User from '@/modules/Auth/entities/user.entity';
import { formatDate, formatDateTimeLocal } from '@/utils/date';

@Component
class RentalFormComponent extends Vue {
  private skatePark: SkatePark = new SkatePark();
  private user: User = new User();

  private rental = {
    date: null as Date | null,
    startHour: null as string | null,
    duration: null as string | null,
  };

  private datePicker = false;
  private formattedDate = '';
  private availableHours: string[] = [];

  public loading = false;
  private $router: any;

  private get availableDurations() {
    if (!this.rental.startHour || !this.availableHours.length) return [];

    const start = parseInt(this.rental.startHour);
    const availableSet = new Set(this.availableHours.map((h) => parseInt(h)));

    const canDo1h = availableSet.has(start);
    const canDo2h = availableSet.has(start + 1);
    const canDoDay = start === 8;

    const options = [];
    if (canDo1h) options.push({ text: '1 hora (R$ 100)', value: '1h' });
    if (canDo2h) options.push({ text: '2 horas (R$ 200)', value: '2h' });
    if (canDoDay) options.push({ text: 'Dia todo (R$ 500)', value: 'day' });

    return options;
  }

  private async onDateSelected() {
    this.formattedDate = formatDate(this.rental.date?.toString() || '');
    this.rental.startHour = null;
    this.rental.duration = null;
    this.availableHours = [];

    if (this.rental.date) {
      this.loading = true;
      try {
        const isoDate = this.rental.date.toISOString().split('T')[0];
        const result = await rentalService.getAvailableHours(isoDate, Number(this.skatePark.id));
        this.availableHours = result;
      } catch (e) {
        console.error('Erro ao buscar horários disponíveis:', e);
      } finally {
        this.loading = false;
      }
    }
  }

  private async submitRental() {
    const { date, startHour, duration } = this.rental;

    if (!date || !startHour || !duration) return;

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = parseInt(startHour!);

    const start = formatDateTimeLocal(year, month + 1, day, hour);
    let endHour = hour;

    if (duration === '1h') endHour += 1;
    else if (duration === '2h') endHour += 2;
    else endHour = 23;

    let end = formatDateTimeLocal(year, month + 1, day, endHour);

    const hours = duration === 'day' ? 10 : parseInt(duration.replace('h', ''));
    const rentValue = hours >= 10 ? 500 : hours * 100;

    const payload = {
      skate_park_id: Number(this.skatePark.id),
      renter_name: this.user.name,
      renter_id: this.user.id,
      start_time: start,
      end_time: end,
      rent_value: rentValue,
    };

    this.loading = true;
    try {
      const service = await rentalService.create(payload);
      
      this.$snackbar('Aluguel realizado com sucesso!', 'success');

      setTimeout(() => {
        this.$router.push({
          name: 'rented-form',
          params: {
            id: service.id.toString(),
          },
        });
      }, 1000);
    } catch (e) {
      this.$snackbar(e as string, 'error');
    } finally {
      this.loading = false;
    }
  }

  private goBack() {
    this.$router.go(-1);
  }

  public created() {
    this.getSelectedSkatePark();
  }

  public async mounted() {
    const userInfo = localStorage.getItem('user-info');
    if (userInfo) {
      this.user = JSON.parse(userInfo);
    }

    const today = new Date();
    this.rental.date = today;
    this.formattedDate = formatDate(today);

    await this.getSelectedSkatePark();

    if (this.rental.date && this.skatePark.id) {
      await this.onDateSelected();
    }
  }

  private async getSelectedSkatePark() {
    const routeParams: any = useRoute().params.id;
    try {
      const response = await skateParkService.getById(routeParams);
      this.skatePark = new SkatePark(response);
    } catch (err) {
      console.error('Erro ao carregar pista:', err);
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
