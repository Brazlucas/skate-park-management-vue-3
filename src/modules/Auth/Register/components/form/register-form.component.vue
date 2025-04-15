<template>
  <v-container fluid>
    <v-row justify="center" class="register-form__background">
      <v-col cols="12" md="8" lg="4">
        <v-card>
          <v-card-title class="headline">Cadastro de Usuário</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form ref="form">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="user.name"
                    label="Nome"
                    outlined
                    dense
                    prepend-inner-icon="mdi-account-outline"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="user.email"
                    label="E-mail"
                    outlined
                    dense
                    prepend-inner-icon="mdi-email-outline"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="user.password"
                    :type="passwordVisible ? 'text' : 'password'"
                    label="Senha"
                    outlined
                    dense
                    prepend-inner-icon="mdi-lock-outline"
                    :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="passwordVisible = !passwordVisible"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="user.passwordConfirmation"
                    :type="passwordConfirmationVisible ? 'text' : 'password'"
                    label="Confirmar Senha"
                    outlined
                    dense
                    prepend-inner-icon="mdi-lock-outline"
                    :append-inner-icon="passwordConfirmationVisible ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="passwordConfirmationVisible = !passwordConfirmationVisible"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="user.address"
                    label="Endereço"
                    outlined
                    dense
                    prepend-inner-icon="mdi-account-outline"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="user.phone"
                    label="Telefone"
                    outlined
                    dense
                    prepend-inner-icon="mdi-account-outline"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex justify-space-between">
            <v-btn color="secondary" @click="goBack" rounded>
              <v-icon @click="goBack" left>mdi-arrow-left</v-icon> Voltar
            </v-btn>
            <v-btn color="primary" :loading="loading" @click="submit" rounded>
              <v-icon left>mdi-account-plus</v-icon> Cadastrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import snackbarComponent from '@/components/global-snackbar.component.vue';
import User from '../../../entities/user.entity';
import registerService from '../../services/register.service';

@Component({
  components: {
    snackbarComponent,
  },
})
class RegisterFormComponent extends Vue {
  private user: User = new User();

  private $store: any;

  private $router: any;

  public snackbarState: boolean = false;

  public responseMessage: any = {};

  private responseType: string = '';

  private passwordVisible: boolean = false;

  private passwordConfirmationVisible: boolean = false;

  private loadingValue: boolean = false;

  private errors: {} = {};

  public openSnackbar() {
    this.snackbarState = true;

    setTimeout(() => {
      this.snackbarState = false;
    }, 2000);
  }

  public closeSnackbar() {
    this.snackbarState = false;
  }

  private goBack() {
    this.$router.go(-1);
  }

  private submit(): void {
    this.loadingValue = true;

    registerService.register(this.user)
      .then((response: any) => {
        this.responseMessage = response?.message;
        this.responseType = 'success';
        this.openSnackbar();
        setTimeout(() => {
          this.$router.push({ name: 'login' });
        }, 1000);
      })
      .catch((error: any) => {
        this.responseMessage = error?.response?.data?.errors;
        this.openSnackbar();
      })
      .finally(() => {
        this.loadingValue = false;
      });
  }
}
export default toNative(RegisterFormComponent);
</script>

<style lang="sass">
.register-form {
  &__background {
    &::before {
      filter: blur(7px);
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url('https://gooutside.com.br/wp-content/uploads/sites/3/fckeditor/upload/image/AGOSTO%202012/Josh_Kalis_Noseblunt_Slide_Blabac_Photo_2002.jpg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 0.7;
      border-radius: 15px;
    }
  }
}
</style>