<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row>
          <!-- Informações do Administrador -->
          <v-col cols="12" md="8">
            <v-card>
              <v-card-title class="headline">Informações do Administrador</v-card-title>
              <v-card-subtitle>{{ admin.email }}</v-card-subtitle>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6">
                    <div class="text-subtitle-1">Nome</div>
                    <v-text-field v-model="admin.name" label="Nome" outlined dense></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div class="text-subtitle-1">E-mail</div>
                    <v-text-field v-model="admin.email" label="E-mail" outlined dense></v-text-field>
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

          <!-- Configurações e Gerenciamento -->
          <v-col cols="12" md="4">
            <v-card>
              <v-card-title class="headline">Configurações</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-btn class="mb-5" @click="openChangePassword" color="secondary" block rounded>
                  Alterar Senha
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Gerenciamento de Entidades -->
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="headline">Gerenciamento do Sistema</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="3" v-for="item in items" :key="item.id">
                    <v-card class="pa-3" outlined @click="openModule(item)">
                      <v-card-title>{{ item.module }}</v-card-title>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';

@Component
export default class AdminPanel extends Vue {
  public admin: any = {
    name: '',
    email: '',
  };

  public items: any[] = [
    { id: 1, module: 'Usuários' },
    { id: 2, module: 'Pistas' },
    { id: 3, module: 'Aluguéis' },
    { id: 4, module: 'Localizações' }
  ];

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

  // private openModule(item: any) {
  //   this.$router.push({ name: `${item.module.toLowerCase()}-management` });
  // }
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
