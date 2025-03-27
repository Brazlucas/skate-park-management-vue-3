<template>
  <v-card class="global-form">
    <snackbar-component
      :value="responseMessage"
      :snackbar="snackbarState"
      :type="responseType"
      @close-snackbar="closeSnackbar"
    />
    <v-row no-gutters class="justify-center d-flex">
      <v-col cols="12">
        <v-card-title class="global__content__card__title d-flex justify-space-between">
          <span class="title-text">Adicionar Localização</span>
          <span><v-icon>mdi-plus</v-icon></span>
        </v-card-title>
        <v-card-subtitle class="global__content__card__subtitle">
          Adicione uma nova localização no sistema
        </v-card-subtitle>
      </v-col>

      <!-- Campo de Nome da Localização -->
      <v-col cols="12" sm="8" class="mt-4">
        <div class="text-subtitle-1 text-medium-emphasis">Nome da Localização</div>
        <v-text-field
          density="compact"
          placeholder="Ex: São Paulo, SP"
          variant="outlined"
          v-model="location.name"
          id="name"
          :error-messages="formError.name"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Botões de Ação -->
    <v-row class="d-flex justify-center">
      <v-col cols="12" sm="6" class="mt-6">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-btn
              @click="addLocation"
              v-bind="props"
              class="global__content"
              :color="isHovering ? 'red' : 'primary'"
              title="Adicionar Localização"
              text="Adicionar"
              width="100%"
              elevation="10"
              rounded
            >
              <v-icon left>mdi-map-marker-plus</v-icon>
              Adicionar Localização
            </v-btn>
          </template>
        </v-hover>
      </v-col>
      
      <v-col cols="12" sm="6" class="mt-4">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-btn
              @click="goBack"
              v-bind="props"
              class="global__content"
              :color="isHovering ? 'grey' : 'secondary'"
              title="Voltar"
              text="Voltar"
              width="100%"
              elevation="8"
              rounded
            >
              <v-icon left>mdi-arrow-left</v-icon>
              Voltar
            </v-btn>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import snackbarComponent from '@/components/snackbar.component.vue';
import locationService from '../../services/location.service';

@Component({
  components: {
    snackbarComponent,
  },
})
class LocationFormComponent extends Vue {
  private $router: any;
  public snackbarState: boolean = false;
  public responseMessage: string = '';
  private responseType: string = '';
  private formError: any = {};
  private location: { id: string, name: string } = { id: '', name: '' };

  private openSnackbar() {
    this.snackbarState = true;
    setTimeout(() => {
      this.snackbarState = false;
    }, 3000);
  }

  private closeSnackbar() {
    this.snackbarState = false;
  }

  private addLocation() {
    if (!this.location.name) {
      this.formError.name = 'O nome da localização é obrigatório!';
      return;
    }

    locationService.create(this.location)
      .then(() => {
        this.responseMessage = 'Localização adicionada com sucesso!';
        this.responseType = 'success';
        this.openSnackbar();
        setTimeout(() => {
          this.$router.push({ name: 'admin-form' });
        }, 1000);
      })
      .catch((err) => {
        this.responseMessage = err?.response?.data?.message || 'Erro ao adicionar a localização.';
        this.responseType = 'error';
        this.openSnackbar();
      });
  }

  private goBack() {
    this.$router.go(-1);
  }
}

export default toNative(LocationFormComponent);
</script>

<style lang="sass">
.title-text {
  font-size: 1.5rem;
  font-weight: 600;
}

.global__content__card__title {
  color: #2D2D2D;
}

.global__content__card__subtitle {
  font-weight: 300;
  color: #616161;
}

.v-btn {
  font-weight: 500;
}

.global__content {
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: none;
}

.text-subtitle-1 {
  font-weight: 600;
  color: #757575;
}

.v-text-field .v-input__control {
  padding-bottom: 20px;
}
</style>
