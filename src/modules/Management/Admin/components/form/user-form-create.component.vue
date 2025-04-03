<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" md="12">
            <v-card>
              <v-card-title class="headline">Adicionar Usuário</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="6">
                      <div class="text-subtitle-1">Nome do Usuário</div>
                      <v-text-field
                        v-model="user.name"
                        label="Nome"
                        outlined
                        dense
                        :rules="[rules.required]"
                        :error-messages="formError.name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <div class="text-subtitle-1">E-mail</div>
                      <v-text-field
                        v-model="user.email"
                        label="E-mail"
                        outlined
                        dense
                        :rules="[rules.required, rules.email]"
                        :error-messages="formError.email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <div class="text-subtitle-1">Endereço</div>
                      <v-text-field
                        v-model="user.address"
                        label="Endereço"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <div class="text-subtitle-1">Telefone</div>
                      <v-text-field
                        v-model="user.phone"
                        label="Telefone"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <div class="text-subtitle-1">Senha</div>
                      <v-text-field
                        v-model="user.password"
                        label="Senha"
                        type="password"
                        outlined
                        dense
                        :rules="[rules.required, rules.min]"
                        :error-messages="formError.password"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <div class="text-subtitle-1">Envio de notificações</div>
                      <div class="d-flex">
                        <v-switch class="mr-4" v-model="user.notifications.email" label="E-mail" color="primary"></v-switch>
                        <v-switch v-model="user.notifications.sms" label="SMS" color="primary"></v-switch>
                      </div>
                    </v-col>
                    <v-col cols="3">
                      <div class="text-subtitle-1">Administrador</div>
                      <div class="d-flex">
                        <v-switch class="mr-4" v-model="user.isAdmin" :label="user.isAdmin ? 'Sim' : 'Não'" color="primary"></v-switch>
                      </div>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between">
                <v-btn color="secondary" @click="goBack" rounded>
                  <v-icon left>mdi-arrow-left</v-icon> Voltar
                </v-btn>
                <v-btn color="primary" :loading="loading" @click="createUser" rounded>
                  <v-icon left>mdi-account-plus</v-icon> Adicionar Usuário
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
import snackbarComponent from '@/components/snackbar.component.vue';
import registerService from '@/modules/Auth/Register/services/register.service';
import User from '@/modules/Auth/entities/user.entity';

@Component({
  components: { snackbarComponent },
})
class UserCreationFormComponent extends Vue {
  private $router: any;
  private user: User = new User();
  private roles = ['Administrador', 'Usuário Padrão', 'Gerente'];
  public snackbarState = false;
  public responseMessage = '';
  private responseType = '';
  private formError: any = {};

  private openSnackbar() {
    this.snackbarState = true;
    setTimeout(() => (this.snackbarState = false), 3000);
  }

  private rules = {
    required: (value: string) => !!value || 'Campo obrigatório.',
    email: (value: string) => /.+@.+\..+/.test(value) || 'E-mail inválido.',
    min: (value: string) => (value && value.length >= 6) || 'A senha deve ter no mínimo 6 caracteres.',
  };

  private closeSnackbar() {
    this.snackbarState = false;
  }

  private createUser() {
    this.formError = {};
    if (!this.user.name) this.formError.name = 'O nome é obrigatório!';
    if (!this.user.email) this.formError.email = 'O e-mail é obrigatório!';
    if (!this.user.address) this.formError.address = 'O endereço é obrigatório!';
    if (!this.user.password) this.formError.password = 'A senha é obrigatória!';

    if (Object.keys(this.formError).length) return;

    registerService.internalRegistration(this.user)
      .then(() => {
        this.responseMessage = 'Usuário criado com sucesso!';
        this.responseType = 'success';
        this.openSnackbar();
        setTimeout(() => this.$router.push({ name: 'user-list' }), 1000);
      })
      .catch((err) => {
        this.responseMessage = err?.response?.data?.message || 'Erro ao criar usuário.';
        this.responseType = 'error';
        this.openSnackbar();
      });
  }

  private goBack() {
    this.$router.go(-1);
  }
}

export default toNative(UserCreationFormComponent);
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
</style>
