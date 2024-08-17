<template>
  <v-form ref="form" class="login-form">
    <snackbar-component
      :value="responseMessage"
      :snackbar="snackbarState"
      @close-snackbar="closeSnackbar"
    />
    <v-row>
      <v-col cols="12">
        <h3>E-mail*</h3>
        <v-text-field
          hide-details="auto"
          label="Endereço de e-mail"
          placeholder="johndoe@gmail.com"
          type="email"
          v-model="auth.email"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <h3>Senha*</h3>
        <v-text-field
          hide-details="auto"
          label="Senha"
          placeholder="password"
          type="password"
          v-model="auth.password"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="login-form__controller">
        <v-btn @click="submit" color="primary">Login</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import Auth from '../../entities/auth.entity';
import authService from '../../services/auth.service';
import snackbarComponent from '../../../../components/snackbar.component.vue';

@Component({
  components: {
    snackbarComponent,
  },
})
class LoginFormComponent extends Vue {
  private auth: Auth = new Auth();

  private $store: any;

  private $router: any;

  public snackbarState: boolean = false;

  public responseMessage: any = {};

  public openSnackbar() {
    this.snackbarState = true;
  }

  public closeSnackbar() {
    this.snackbarState = false;
  }

  private submit(): void {
    authService.login(this.auth)
      .then((response: any) => {
        this.responseMessage = response?.message;
        this.openSnackbar();
        setTimeout(() => {
          this.$router.push({ name: 'home' });
        }, 1000);
      })
      .catch((error: any) => {
        console.log(error);
        this.responseMessage = error?.response?.data?.error;
        this.openSnackbar();
      });
    // this.$store.dispatch('auth/login', this.auth);
  }
}
export default toNative(LoginFormComponent);
</script>

<style lang="scss" scoped>
.login-form {
  display: flex;
  margin: 0 auto;
  margin-top: 15rem !important;
  width: 30%;
  padding: 0px !important;
  &__controller {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
}
</style>