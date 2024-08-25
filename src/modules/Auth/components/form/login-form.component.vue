<template>
  <v-form ref="form" class="login-form">
    <div class="login-form__background">
      <snackbar-component
        :value="responseMessage"
        :snackbar="snackbarState"
        @close-snackbar="closeSnackbar"
      />
      <v-img
        class="mx-auto my-6"
        max-width="228"
        src="https://i.ibb.co/c3Z73xv/choris-logo.jpg"
      />
      <v-card
        dark
        theme="dark"
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
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
          <a
            class="text-caption text-decoration-none text-red"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Esqueceu a senha?
          </a>
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
          Logar
        </v-btn>
          <v-card-text class="text-center">
            <a
              class="text-red text-decoration-none"
              href="/register"
              rel="noopener noreferrer"
            >
              Cadastre-se agora <v-icon icon="mdi-chevron-right"></v-icon>
            </a>
          </v-card-text>
      </v-card>
    </div>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import User from '../../entities/user.entity';
import authService from '../../services/auth.service';
import snackbarComponent from '../../../../components/snackbar.component.vue';

@Component({
  components: {
    snackbarComponent,
  },
})
class LoginFormComponent extends Vue {
  private user: User = new User();

  private $store: any;

  private $router: any;

  public snackbarState: boolean = false;

  public responseMessage: any = {};

  private passwordVisible: boolean = false;

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

  private submit(): void {
    this.loadingValue = true;

    authService.login(this.user)
      .then((response: any) => {
        this.responseMessage = response?.message;
        this.openSnackbar();
        setTimeout(() => {
          this.$router.push({ name: 'home' });
        }, 1000);
      })
      .catch((error: any) => {
        this.responseMessage = error?.response?.data?.error;
        this.openSnackbar();
      })
      .finally(() => {
        this.loadingValue = false;
      });
    // this.$store.dispatch('auth/login', this.auth);
  }
}
export default toNative(LoginFormComponent);
</script>

<style lang="sass">
.login-form {
  &__background {
    &::before {
      filter: blur(7px);
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url('https://vejasp.abril.com.br/wp-content/uploads/2016/12/chorao-skate.gif');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 0.7;
      border-radius: 15px;
    }
  }
}
</style>