<template>
  <v-card class="global-form">
    <v-row no-gutters class="d-flex justify-center">
      <v-col cols="12">
        <v-card-title class="global__content__card__title d-flex justify-space-between">
          <span>Gerenciamento</span>
          <span><v-icon color="gray">mdi-cog</v-icon></span>
        </v-card-title>
        <v-card-subtitle class="global__content__card__subtitle">
          Gerenciar entidades do sistema
        </v-card-subtitle>
      </v-col>

      <!-- Cards -->
      <v-card
        v-for="item in items" 
        :key="item.id" 
        class="card-item"
        @click="openModal(item)"
      >
        <v-card-title class="mb-5">{{ item.module }}</v-card-title>
      </v-card>

      <v-col cols="3" class="mt-10">
        <canvas id="dashboardChart"></canvas>
      </v-col>
    </v-row>

    <!-- Modal -->
    <v-dialog v-model="dialog" width="800">
      <v-card>
        <v-card-title class="text-h5 d-flex justify-space-between">
          <span>{{ selectedItem?.module }}</span>
          <v-btn color="white" @click="goToCreate(selectedItem?.module)"><v-icon>mdi-plus</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :items="responseItems"
          >
            <template v-slot:items="{ item }">
              <v-btn small color="blue" @click="editItem(item)">
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
              <v-btn small color="red" @click="deleteItem(item)">
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import skateParkService from '@/modules/SkatePark/services/skate-park.service';
import { Component, Vue, toNative, Watch } from 'vue-facing-decorator';
import Chart from 'chart.js/auto';
import rentalService from '@/modules/Rental/services/rental.service';
import userService from '@/modules/User/services/user.service';
import locationService from '@/modules/SkatePark/services/location.service';

@Component
class AdminFormComponent extends Vue {
  private dialog = false;
  private selectedItem: any = null;
  private responseItems: any = [];
  private $router: any;

  private headers = [
    { text: "Nome", value: "nome" },
    { text: "Descrição", value: "descricao" },
    { text: "Ações", value: "acoes", sortable: false }
  ];

  public get items() {
    return [
      { module: "Usuários", id: 1 },
      { module: "Pistas", id: 2 },
      { module: "Alugueis", id: 3 },
      { module: "Localizações", id: 5 }
    ];
  }

  @Watch('selectedItem')
  private async getResponseByModule() {
    if (!this.selectedItem) return;

    try {
      switch (this.selectedItem.module) {
        case 'Pistas':
          this.responseItems = await skateParkService.getAll();
          break;
        case 'Alugueis':
          this.responseItems = await rentalService.getAll();
          break;
        case 'Usuários':
          this.responseItems = await userService.getUsers();
          break;
        case 'Localizações':
          this.responseItems = await locationService.getAll();
          break;
        default:
          this.responseItems = [];
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  private openModal(item: any) {
    this.selectedItem = item;
    this.dialog = true;
  }

  private editItem(item: any) {
    alert(`Editar item: ${item.nome}`);
  }

  private goToCreate(item: string) {
    switch (item) {
      case "Pistas":
        this.$router.push({ name: "skate-park-form" });
        break;
      case "Localizações":
        this.$router.push({ name: "location-form"})
        break;
      default:
        break;
    }
  }

  private deleteItem(item: any) {
    if (confirm(`Tem certeza que deseja excluir ${item.nome}?`)) {
      this.responseItems = this.responseItems.filter((i: any) => i !== item);
    }
  }

  private getChart() {
  const data = [
    { name: 'Alugueis', valor: 4000 },
    { name: 'Despesas', valor: 2400 },
    { name: 'Lucro', valor: 1600 },
    { name: 'Pistas', valor: 10 }
  ];

  const createChart = () => {
    // @ts-ignore
    const ctx = document.getElementById('dashboardChart')?.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(item => item.name),
          datasets: [
            {
              data: data.map(item => item.valor),
              backgroundColor: ['blue', 'red', 'green', 'yellow'],
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    };
    return createChart();
  }

  private created() {
    setTimeout(() => {
      this.getChart();
    }, 500);
  }
}

export default toNative(AdminFormComponent);
</script>

<style lang="sass">
.card-item {
  margin-right: 20px !important;
  margin-top: 50px;
  padding: 25px !important;
  height: 12vw !important;
  width: 250px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
}
  &:active {
    transform: scale(0.98);
  }
}
</style>
