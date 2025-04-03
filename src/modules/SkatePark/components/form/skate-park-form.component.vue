<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" md="12">
            <v-card>
              <v-card-title class="headline">Adicionar Pista de Skate</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <div class="text-subtitle-1">Nome da Pista</div>
                    <v-text-field 
                      v-model="skatePark.name" 
                      label="Nome" 
                      outlined 
                      dense 
                      :error-messages="formError.name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <div class="text-subtitle-1">Localização</div>
                    <v-select 
                      v-model="skatePark.location" 
                      label="Selecione a localização" 
                      outlined 
                      dense 
                      :items="locations" 
                      :error-messages="formError.location"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <div class="text-subtitle-1">Descrição</div>
                    <v-textarea 
                      v-model="skatePark.description" 
                      label="Descrição" 
                      outlined 
                      dense 
                      :error-messages="formError.description"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between">
                <v-btn color="secondary" @click="goBack" rounded>
                  <v-icon left>mdi-arrow-left</v-icon> Voltar
                </v-btn>
                <v-btn color="primary" :loading="loading" @click="addSkatePark" rounded>
                  <v-icon left>mdi-skateboard</v-icon> Adicionar Pista
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
import skateParkService from '../../services/skate-park.service';
import locationService from '../../services/location.service';
import SkatePark from '../../entities/skate-park.entity';

@Component
class SkateParkFormComponent extends Vue {
  private $router: any;
  public formError: any = {};
  public loading: boolean = false;
  public skatePark: SkatePark = new SkatePark();
  public locations: string[] = [];

  private addSkatePark() {
    this.formError = {};
    if (!this.skatePark.name) this.formError.name = 'O nome da pista é obrigatório!';
    if (!this.skatePark.location) this.formError.location = 'Selecione uma localização!';
    if (!this.skatePark.description) this.formError.description = 'A descrição é obrigatória!';
    if (Object.keys(this.formError).length > 0) return;

    this.loading = true;
    skateParkService.create(this.skatePark)
      .then(() => {
        this.$router.push({ name: 'skate-park-list' });
      })
      .catch(() => {
        this.formError.name = 'Erro ao adicionar a pista de skate.';
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private goBack() {
    this.$router.go(-1);
  }

  private created() {
    locationService.getAll()
      .then((response) => {
        this.locations = response.map((location: any) => location.name);
      })
      .catch(() => {
        this.formError.location = 'Erro ao carregar localizações.';
      });
  }
}

export default toNative(SkateParkFormComponent);
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