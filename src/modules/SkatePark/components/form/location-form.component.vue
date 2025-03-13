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
          <span>Adicionar localização</span>
          <span><v-icon>mdi-plus</v-icon></span>
        </v-card-title>
        <v-card-subtitle class="global__content__card__subtitle">
          Adicione uma localização no sistema
        </v-card-subtitle>
      </v-col>
      <v-col cols="9" class="ml-5 mt-15">
        <div class="text-subtitle-1 text-medium-emphasis">Nome</div>
        <v-text-field
          density="compact"
          placeholder="Nome da localização de SP"
          variant="outlined"
          type="email"
          v-model="location.name"
          id="name"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn
              @click="addLocation"
              v-bind="props"
              class="global__content"
              :color="isHovering ? 'red' : undefined"
              title="Hover over me"
              text="Adicionar localização"
              width="50%"
              elevation="8"
              rounded
            ></v-btn>
          </v-col>
        </v-row>
      </template>
    </v-hover>

    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn
              @click="goBack"
              v-bind="props"
              class="global__content"
              :color="isHovering ? 'white' : undefined"
              title="Hover over me"
              text="Voltar"
              width="50%"
              elevation="8"
              rounded
            ></v-btn>
          </v-col>
        </v-row>
      </template>
    </v-hover>
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

  public responseMessage: any = {};

  private responseType: string = '';

  private loadingValue: boolean = false;

  private formError: any = {};

  private locations: string[] = [];

  private location: { id: string, name: string } = { id: '', name: ''}

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

  private goBack() {
    this.$router.go(-1);
  }

  public openSnackbar() {
    this.snackbarState = true;

    setTimeout(() => {
      this.snackbarState = false;
    }, 2000);
  }

  public closeSnackbar() {
    this.snackbarState = false;
  }

  private addLocation() {
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
        this.responseMessage = err?.response?.data?.message;
        this.responseType = 'error';
        this.openSnackbar();
      })
      .finally(() => {
        this.loadingValue = false;
      });
  }

  // private created() {
  //   this.getLocations();
  // }
}
export default toNative(LocationFormComponent);
</script>