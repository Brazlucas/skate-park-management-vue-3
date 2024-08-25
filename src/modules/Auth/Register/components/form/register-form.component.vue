<template>
  <v-form ref="form" class="register-form">
    <div class="register-form__background">
      <snackbar-component
        :value="responseMessage"
        :snackbar="snackbarState"
        @close-snackbar="closeSnackbar"
      />
      <v-img
        class="mx-auto my-6"
        max-width="228"
        src="https://i.ibb.co/c3Z73xv/choris-logo.jpg"
      ></v-img>
      <v-card
        dark
        theme="dark"
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
        <div class="text-subtitle-1 text-medium-emphasis">Nome</div>
        <v-text-field
          density="compact"
          placeholder="Nome do usuário"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          v-model="user.name"
          type="email"
        ></v-text-field>
        <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>
        <v-text-field
          density="compact"
          placeholder="Endereço de e-mail"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="user.email"
          type="email"
        ></v-text-field>
        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Senha
        </div>
        <v-text-field
          :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="passwordVisible ? 'text' : 'password'"
          density="compact"
          placeholder="Senha"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          v-model="user.password"
          @click:append-inner="passwordVisible = !passwordVisible"
          ></v-text-field>
          <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
            Confirmar senha
          </div>
          <v-text-field
            :append-inner-icon="passwordConfirmationVisible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="passwordConfirmationVisible ? 'text' : 'password'"
            density="compact"
            placeholder="Confirmar senha"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            v-model="user.passwordConfirmation"
            @click:append-inner="passwordConfirmationVisible = !passwordConfirmationVisible"
            @keypress.enter="submit"
          ></v-text-field>
        <v-card
          class="mb-8"
          color="surface-variant"
          variant="tonal"
        >
        </v-card>
        <v-btn
          class="mb-8"
          color="white"
          size="large"
          variant="tonal"
          block
          @click="submit"
          :loading="loadingValue"
        >
          Cadastrar
        </v-btn>
          <v-card-text class="text-center">
            <a
              class="text-red text-decoration-none"
              href="/"
              rel="noopener noreferrer"
            >
              Voltar para o login <v-icon icon="mdi-chevron-right"></v-icon>
            </a>
          </v-card-text>
      </v-card>
    </div>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import snackbarComponent from '@/components/snackbar.component.vue';
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

  private submit(): void {
    this.loadingValue = true;

    registerService.register(this.user)
      .then((response: any) => {
        this.responseMessage = response?.message;
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