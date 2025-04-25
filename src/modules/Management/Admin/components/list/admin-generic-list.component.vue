<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="headline d-flex justify-space-between">
            {{ item.module }}
          </v-card-title>
          <v-divider />

          <v-data-table
            :headers="headers"
            :items="items"
            item-value="id"
            class="elevation-1"
          >
            <template v-slot:[`item.created_at`]="{ item }">
              {{ formatDate(item.created_at) }}
            </template>
            <template v-slot:[`item.updated_at`]="{ item }">
              {{ formatDate(item.updated_at) }}
            </template>
            <template v-slot:[`item.email_verified_at`]="{ item }">
              {{ formatDate(item.email_verified_at) }}
            </template>
            <template v-slot:[`item.locked_until`]="{ item }">
              {{ formatDate(item.locked_until) }}
            </template>
            <template v-slot:[`item.notifications`]="{ item }">
              <div>
                Email: <strong>{{ item.notifications?.email ? 'Sim' : 'Não' }}</strong> |
                SMS: <strong>{{ item.notifications?.sms ? 'Sim' : 'Não' }}</strong>
              </div>
            </template>
            <template v-slot:[`item.is_admin`]="{ item }">
              {{ item.is_admin ? 'Sim' : 'Não' }}
            </template>
            <template v-slot:[`item.rented`]="{ item }">
              {{ item.rented ? 'Sim' : 'Não' }}
            </template>
            <template v-slot:[`item.rentals`]="{ item }">
              {{ item.rentals?.length || 0 }} aluguéis
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn icon color="primary" @click="editItem(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red" @click="deleteItem(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>

          <v-card-actions class="d-flex justify-space-between">
            <v-btn color="secondary" @click="goBack" rounded>
              <v-icon left>mdi-arrow-left</v-icon> Voltar
            </v-btn>
            <v-btn
              v-if="item.module !== 'Aluguéis'"
              color="primary"
              :loading="loading"
              @click="goToCreate"
              rounded
            >
              <v-icon left>mdi-plus</v-icon> Criar {{ item.module }}
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
import rentalService from '@/modules/Rental/services/rental.service';
import locationService from '@/modules/SkatePark/services/location.service';
import skateParkService from '@/modules/SkatePark/services/skate-park.service';
import userService from '@/modules/User/services/user.service';

@Component({
  methods: {
    ...mapActions(['setIsLoading']),
  },
})
export default class AdminGenericList extends Vue {
  public items: any[] = [];
  public headers: any[] = [];
  public item: any = {};
  public setIsLoading!: Function;
  public loading = false;
  public $router!: any;

  public headerTranslations: Record<string, string> = {
    name: 'Nome',
    email: 'Email',
    address: 'Endereço',
    phone: 'Telefone',
    notifications: 'Notificações',
    email_verified_at: 'Email verificado em',
    created_at: 'Criado em',
    updated_at: 'Atualizado em',
    login_attempts: 'Tentativas de Login',
    locked_until: 'Bloqueado até',
    is_admin: 'Administrador',
    description: 'Descrição',
    location_id: 'Localização',
    image: 'Link da imagem',
    rentals: 'Aluguéis',
    rented: 'Alugada',
    city: 'Cidade',
    state: 'Estado',
    end_time: 'Horário de término',
    start_time: 'Horário de início',
    renter_id: 'ID do locatário',
    skate_park_id: 'ID da pista',
    renter_name: 'Nome do locatário',
    skate_park_name: 'Nome da pista',
    rent_value: 'Valor do aluguel',
  };

  public ids: string[] = [
    'id',
    'renter_id',
    'skate_park_id',
    'location_id',
  ];

  private formatDate(dateStr: string): string {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  private getTranslatedHeaders(data: any): any[] {
    const keys = Object.keys(data).filter(key => key !== 'id' && !this.ids.includes(key));

    const formatted = keys.map((key) => ({
      title: this.headerTranslations[key] || key,
      key: key,
    }));

    formatted.push({ title: 'Ações', key: 'actions' });
    return formatted;
  }

  private async onListEnter() {
    this.setIsLoading(true);

    const module = this.item.module;

    try {
      let response = [];

      if (module === 'Usuários') {
        response = await userService.getUsers();
      } else if (module === 'Pistas') {
        response = await skateParkService.getAll();
      } else if (module === 'Aluguéis') {
        response = await rentalService.getAll();
      } else if (module === 'Localizações') {
        response = await locationService.getAll();
      }

      this.items = response;
      if (response.length > 0) {
        this.headers = this.getTranslatedHeaders(response[0]);
      }
    } catch (error) {
      console.error(`Erro ao buscar dados de ${module.toLowerCase()}:`, error);
    } finally {
      this.setIsLoading(false);
    }
  }

  private goBack() {
    this.$router.go(-1);
  }

  private goToCreate() {
    let route = '';
    if (this.item.module === 'Usuários') route = 'user-form-create';
    if (this.item.module === 'Pistas') route = 'skate-park-form';
    if (this.item.module === 'Localizações') route = 'location-form';

    if (route) this.$router.push({ name: route });
  }

  private editItem(item: any) {
    localStorage.setItem('edit-item', JSON.stringify(item));
    if (this.item.module === 'Usuários') {
      this.$router.push({ name: 'user-form-edit', params: { id: item.id.toString() } });
    } else if (this.item.module === 'Pistas') {
      this.$router.push({ name: 'skate-park-form-edit', params: { id: item.id.toString() } });
    }
  }

  private deleteItem(item: any) {
    const confirmDelete = confirm(`Tem certeza que deseja excluir o item com ID ${item.id}?`);
    if (!confirmDelete) return;

    let service: any;
    if (this.item.module === 'Usuários') service = userService;
    else if (this.item.module === 'Pistas') service = skateParkService;
    else if (this.item.module === 'Aluguéis') service = rentalService;
    else if (this.item.module === 'Localizações') service = locationService;

    service.delete(item.id).then(() => {
      this.items = this.items.filter(i => i.id !== item.id);
    });
  }

  private created() {
    this.item = JSON.parse(localStorage.getItem('module') || '{}');
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
