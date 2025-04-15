<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" md="12">
            <v-card>
              <v-card-title class="headline">Adicionar Localização</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <div class="text-subtitle-1">Cidade</div>
                    <v-text-field 
                      v-model="location.city" 
                      label="Cidade" 
                      outlined 
                      dense 
                      :error-messages="formError.city"
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <div class="text-subtitle-1">Estado</div>
                    <v-text-field 
                      v-model="location.state" 
                      label="Estado (ex: SP)" 
                      outlined 
                      dense 
                      :error-messages="formError.state"
                    />
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions class="d-flex justify-space-between">
                <v-btn color="secondary" @click="goBack" rounded>
                  <v-icon left>mdi-arrow-left</v-icon> Voltar
                </v-btn>
                <v-btn color="primary" :loading="loading" @click="addLocation" rounded>
                  <v-icon left>mdi-map-marker-plus</v-icon> Adicionar Localização
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
import locationService from '../../services/location.service';

@Component
class LocationFormComponent extends Vue {
  private $router: any;
  public formError: any = {};
  public loading: boolean = false;

  public location: { city: string; state: string } = {
    city: '',
    state: ''
  };

  private addLocation() {
    this.formError = {};

    if (!this.location.city) {
      this.formError.city = 'A cidade é obrigatória!';
    }
    if (!this.location.state) {
      this.formError.state = 'O estado é obrigatório!';
    }

    if (Object.keys(this.formError).length > 0) return;

    this.loading = true;
    locationService.create(this.location)
      .then(() => this.goBack())
      .catch(() => {
        alert('Erro ao adicionar a localização.');
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private goBack() {
    this.$router.go(-1);
  }
}

export default toNative(LocationFormComponent);
</script>

<style scoped>
.headline {
  font-size: 1.5rem;
  font-weight: bold;
}

.text-subtitle-1 {
  font-weight: 600;
  color: #757575;
}

.v-btn {
  text-transform: none;
}
</style>
