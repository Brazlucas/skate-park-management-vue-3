<template>
  <v-form ref="form" class="forgot-pass-form">
    <div class="forgot-pass-form__background">
      <snackbar-component
        :value="responseMessage"
        :snackbar="snackbarState"
        @close-snackbar="closeSnackbar"
        :type="responseType"
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
        <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>
        <v-text-field
          density="compact"
          placeholder="Endereço de e-mail"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="user.email"
          type="email"
        ></v-text-field>
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-btn
              v-bind="props"
              class="mb-8"
              :color="isHovering ? 'red' : undefined"
              size="large"
              variant="tonal"
              block
              rounded
              :loading="loadingValue"
            >
              Enviar e-mail
            </v-btn>
          </template>
        </v-hover>
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

@Component({
  components: {
    snackbarComponent,
  },
})
class ForgotPasswordFormComponent extends Vue {
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
}
export default toNative(ForgotPasswordFormComponent);
</script>

<style lang="sass">
.forgot-pass-form {
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