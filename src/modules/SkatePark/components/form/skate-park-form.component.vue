<template>
  <v-card class="global-form">
    <snackbar-component
      :value="responseMessage"
      :snackbar="snackbarState"
      :type="responseType"
      @close-snackbar="closeSnackbar"
    />
    <v-row no-gutters>
      <v-col cols="12">
        <v-card-title class="global__content__card__title d-flex justify-space-between">
          <span>Adicionar pista de skate</span>
          <span><v-icon>mdi-plus</v-icon></span>
        </v-card-title>
        <v-card-subtitle class="global__content__card__subtitle">
          Preencha os dados abaixo para adicionar uma pista no sistema
        </v-card-subtitle>
      </v-col>
      <v-col cols="9" class="ml-5">
        <div class="text-subtitle-1 text-medium-emphasis">Nome</div>
        <v-text-field
          density="compact"
          placeholder="Nome da pista de skate"
          variant="outlined"
          type="email"
          v-model="skatePark.name"
        ></v-text-field>
      </v-col>
      <v-col cols="9" class="ml-5">
        <div class="text-subtitle-1 text-medium-emphasis">Descrição</div>
        <v-text-field
          density="compact"
          placeholder="Descrição da pista de skate"
          variant="outlined"
          type="email"
          v-model="skatePark.description"
        ></v-text-field>
      </v-col>
      <v-col cols="9" class="ml-5">
        <div class="text-subtitle-1 text-medium-emphasis">Localização</div>
        <v-text-field
          density="compact"
          placeholder="Localização da pista de skate"
          variant="outlined"
          type="email"
          v-model="skatePark.location"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="9" class="d-flex justify-center">
        <v-btn
          @click="addSkatePark"
          class="global__content"
          color="red"
          dark
          elevation="8"
          rounded
          width="50%"
        >
          Adicionar pista
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import snackbarComponent from '@/components/snackbar.component.vue';
import SkatePark from '../../entities/skate-park.entity';
import skateParkService from '../../services/skate-park.service';

@Component({
  components: {
    snackbarComponent,
  },
})
class SkateParkFormComponent extends Vue {
  private skatePark: SkatePark = new SkatePark();

  public snackbarState: boolean = false;

  public responseMessage: any = {};

  private responseType: string = '';

  private loadingValue: boolean = false;

  public openSnackbar() {
    this.snackbarState = true;

    setTimeout(() => {
      this.snackbarState = false;
    }, 2000);
  }

  public closeSnackbar() {
    this.snackbarState = false;
  }

  private addSkatePark() {
    skateParkService.create(this.skatePark)
      .then((response: any) => {
        this.responseMessage = response?.message;
        this.responseType = 'success';
        this.openSnackbar();
      })
      .catch((err) => {
        this.responseMessage = err?.response?.data?.error;
        this.responseType = 'error';
        this.openSnackbar();
      })
      .finally(() => {
        this.loadingValue = false;
      });
  }
}
export default toNative(SkateParkFormComponent);
</script>