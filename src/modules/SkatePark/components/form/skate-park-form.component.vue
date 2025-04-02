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
          <span class="title-text">Adicionar Pista de Skate</span>
          <v-icon>mdi-plus</v-icon>
        </v-card-title>
        <v-card-subtitle class="global__content__card__subtitle">
          Preencha os dados abaixo para adicionar uma pista no sistema
        </v-card-subtitle>
      </v-col>

      <!-- Campo de Nome da Pista -->
      <v-col cols="12" sm="8" class="mt-4">
        <div class="text-subtitle-1 text-medium-emphasis">Nome da Pista</div>
        <v-text-field
          density="compact"
          placeholder="Nome da pista de skate"
          variant="outlined"
          v-model="skatePark.name"
          :error-messages="formError.name"
          outlined
        ></v-text-field>
      </v-col>

      <!-- Seleção de Localização -->
      <v-col cols="12" sm="8" class="mt-4">
        <div class="text-subtitle-1 text-medium-emphasis">Localização</div>
        <v-select
          density="compact"
          placeholder="Selecione a localização da pista"
          variant="outlined"
          :items="locations"
          v-model="skatePark.location"
          :error-messages="formError.location"
        ></v-select>
      </v-col>

      <!-- Campo de Descrição -->
      <v-col cols="12" sm="8" class="mt-4">
        <div class="text-subtitle-1 text-medium-emphasis">Descrição</div>
        <v-textarea
          density="compact"
          placeholder="Descrição da pista de skate"
          variant="outlined"
          v-model="skatePark.description"
          :error-messages="formError.description"
        ></v-textarea>
      </v-col>
    </v-row>

    <!-- Botões de Ação -->
    <v-row class="d-flex justify-center">
      <v-col cols="12" sm="6" class="mt-6">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-btn
              @click="addSkatePark"
              v-bind="props"
              class="global__content"
              :color="isHovering ? 'red' : 'primary'"
              title="Adicionar Pista"
              text="Adicionar"
              width="100%"
              elevation="10"
              rounded
            >
              <v-icon left>mdi-skateboard</v-icon>
              Adicionar Pista
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
import SkatePark from '../../entities/skate-park.entity';
import skateParkService from '../../services/skate-park.service';
import locationService from '../../services/location.service';

@Component({
  components: {
    snackbarComponent,
  },
})
class SkateParkFormComponent extends Vue {
  private $router: any;

  private skatePark: SkatePark = new SkatePark();

  public snackbarState: boolean = false;

  public responseMessage: string = '';

  private responseType: string = '';

  private formError: any = {};

  private locations: string[] = [];

  private openSnackbar() {
    this.snackbarState = true;
    setTimeout(() => {
      this.snackbarState = false;
    }, 3000);
  }

  private closeSnackbar() {
    this.snackbarState = false;
  }

  private addSkatePark() {
    if (!this.skatePark.name) {
      this.formError.name = 'O nome da pista é obrigatório!';
    }
    if (!this.skatePark.location) {
      this.formError.location = 'Selecione uma localização!';
    }
    if (!this.skatePark.description) {
      this.formError.description = 'A descrição é obrigatória!';
    }

    if (this.formError.name || this.formError.location || this.formError.description) return;

    skateParkService.create(this.skatePark)
      .then(() => {
        this.responseMessage = 'Pista de skate adicionada com sucesso!';
        this.responseType = 'success';
        this.openSnackbar();
        setTimeout(() => {
          this.$router.push({ name: 'skate-park-list' });
        }, 1000);
      })
      .catch((err) => {
        this.responseMessage = err?.response?.data?.message || 'Erro ao adicionar a pista de skate.';
        this.responseType = 'error';
        this.openSnackbar();
      });
  }

  private goBack() {
    this.$router.go(-1);
  }

  private created() {
    this.getLocations();

    if (!this.skatePark.location) {
      this.skatePark.location = 'Selecione uma localização';
    }
  }

  private getLocations() {
    locationService.getAll()
      .then((response) => {
        this.locations = response.map((location: any) => location.name);
      })
      .catch((err) => {
        this.responseMessage = err?.response?.data?.message;
        this.responseType = 'error';
        this.openSnackbar();
      });
  }
}

export default toNative(SkateParkFormComponent);
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

.global-form {
  margin: 20px;
}

.text-subtitle-1 {
  font-weight: 600;
  color: #757575;
}

.v-text-field .v-input__control {
  padding-bottom: 20px;
}

.v-select .v-input__control {
  padding-bottom: 20px;
}
</style>
