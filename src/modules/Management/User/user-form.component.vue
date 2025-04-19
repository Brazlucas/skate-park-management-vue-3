<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="headline">Informações do Perfil</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <div class="text-subtitle-1">Nome</div>
                <v-text-field v-model="user.name" label="Nome" outlined dense></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="text-subtitle-1">E-mail</div>
                <v-text-field v-model="user.email" label="E-mail" outlined dense></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="text-subtitle-1">Telefone</div>
                <v-text-field v-model="user.phone" label="Telefone" outlined dense></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="text-subtitle-1">Endereço</div>
                <v-text-field v-model="user.address" label="Endereço" outlined dense></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :loading="loading" @click="updateProfile" rounded>
              Atualizar Perfil
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="headline">Configurações</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-btn class="mb-5" @click="openChangePassword" color="secondary" block rounded>
              Alterar Senha
            </v-btn>
            <v-btn @click="deactivateAccount" color="red" block rounded>
              Desativar Conta
            </v-btn>
          </v-card-text>
        </v-card>

        <v-card class="mt-4">
          <v-card-title class="headline">Suporte</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-btn class="mb-5" color="primary" block rounded @click="openSupport">
              Abrir Chamado
            </v-btn>
            <v-btn color="secondary" block rounded @click="viewSupportHistory">
              Histórico de Chamados
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="headline">Pistas Alugadas</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list v-if="rentals.length">
              <v-list-item v-for="rental in rentals" :key="rental.id">
                <v-list-item-content>
                  <div class="d-flex justify-space-between align-center">
                    <div>
                      <v-list-item-title class="mb-4 mt-4">{{ rental.skate_park.name }}</v-list-item-title>
                      <v-list-item-subtitle class="mb-4">
                        {{ formatDateStart(rental.start_time) }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        {{ formatDateEnd(rental.end_time) }}
                      </v-list-item-subtitle>
                    </div>
                    <v-list-item-subtitle class="mt-2">
                      <v-btn color="primary" @click="viewRentalDetails(rental.id)" rounded>
                        Ver Detalhes
                      </v-btn>
                    </v-list-item-subtitle>
                  </div>
                  <v-divider class="mt-2"></v-divider>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-alert v-else type="info" class="mt-4">
              Nenhuma pista alugada.
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="headline">Preferências de Notificação</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-switch v-model="user.notifications.email" label="E-mail" color="primary"></v-switch>
            <v-switch v-model="user.notifications.sms" label="SMS" color="primary"></v-switch>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="headline">Notificações de Pagamento</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list v-if="payments.length">
              <v-list-item v-for="payment in payments" :key="payment.id">
                <v-list-item-content>
                  <div class="d-flex justify-space-between align-center">
                    <div>
                      <v-list-item-title class="mb-2">{{ payment.month }}</v-list-item-title>
                      <v-list-item-subtitle class="mb-2">Status: {{ payment.status }}</v-list-item-subtitle>
                      <v-list-item-subtitle class="mb-2">Valor: {{ payment.total }}</v-list-item-subtitle>
                      <v-list-item-subtitle class="mb-2">Atualizado no dia: {{ payment.updated_at }}</v-list-item-subtitle>
                    </div>
                    <v-list-item-subtitle class="mt-2">
                      <v-btn color="primary" @click="viewRentalDetails(rental.id)" rounded>
                        Ver Detalhes
                      </v-btn>
                    </v-list-item-subtitle>
                  </div>
                  <v-divider></v-divider>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-alert v-else type="info" class="mt-4">
              Nenhuma notificação de pagamento.
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { mapActions } from 'vuex';
import rentalService from '@/modules/Rental/services/rental.service';
import { formatRentalDateTimeStart, formatRentalDateTimeEnd } from '@/utils/date';
import invoiceService from '@/modules/Invoice/services/invoice.service';

@Component({
  methods: {
    ...mapActions(['setIsLoading']),
  },
})
export default class UserPanel extends Vue {
  public user: any = {
    name: '',
    email: '',
    phone: '',
    address: '',
    notifications: {
      email: true,
      sms: false,
    }
  };

  public $router!: any;

  public setIsLoading!: Function;

  public formatDateStart(start: string) {
    return formatRentalDateTimeStart(start);
  }

  public formatDateEnd(end: string) {
    return formatRentalDateTimeEnd(end);
  }

  public activities: any[] = [
    { id: 1, title: 'Alteração de senha', date: '2025-03-26' },
    { id: 2, title: 'Atualização de perfil', date: '2025-03-25' },
  ];

  public recentItems: any[] = [
    { id: 1, name: 'Produto 1', date: '2025-03-20' },
    { id: 2, name: 'Produto 2', date: '2025-03-19' },
  ];

  public rentals: any[] = [];

  public payments: any[] = [];

  public pendingTasks: any[] = [
    { id: 1, title: 'Pagamento de fatura', date: '2025-03-27' },
    { id: 2, title: 'Revisão de contrato', date: '2025-03-29' },
  ];

  // public payments: any[] = [
  //   { id: 1, description: 'Fatura de Março', status: 'Pendente', amount: 'R$ 200,00' },
  //   { id: 2, description: 'Fatura de Fevereiro', status: 'Pago', amount: 'R$ 150,00' },
  // ];

  public loading: boolean = false;

  // private updateProfile() {
  //   this.loading = true;
  //   setTimeout(() => {
  //     this.loading = false;
  //     this.$toast.success('Perfil atualizado com sucesso!');
  //   }, 1000);
  // }

  // private openChangePassword() {
  //   this.$router.push({ name: 'change-password' });
  // }

  // private deactivateAccount() {
  //   this.$confirm('Tem certeza que deseja desativar sua conta?')
  //     .then(() => {
  //       this.$toast.success('Conta desativada!');
  //       this.$router.push({ name: 'goodbye' });
  //     })
  //     .catch(() => {
  //       console.log('Conta não desativada');
  //     });
  // }

  // private openSupport() {
  //   this.$router.push({ name: 'support-ticket' });
  // }

  // private viewSupportHistory() {
  //   this.$router.push({ name: 'support-history' });
  // }

  private viewRentalDetails(rentalId: number) {
    this.$router.push({ name: 'rented-form', params: { id: rentalId } });
  }

  private getUserRentals() {
    rentalService
      .getRentalsByUser()
      .then((response: any) => {
        this.rentals = response;
      })
      .catch((error: any) => {
        console.error('Error fetching rentals:', error);
      });
  }

  private getInvoices() {
    invoiceService
      .getInvoicesByUser()
      .then((response: any) => {
        this.payments = response;
      })
      .catch((error: any) => {
        console.error('Error fetching invoices:', error);
      });
  }

  private created() {
    this.setIsLoading(true);
    this.user = JSON.parse(localStorage.getItem('user-info') || '');
    setTimeout(() => {
      this.setIsLoading(false);
    }, 500);

    this.getUserRentals();
    this.getInvoices();
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
