<template>
  <!-- <snackbar-component
    :value="responseMessage"
    :snackbar="snackbarState"
    :type="responseType"
    @close-snackbar="closeSnackbar"
  /> -->

  <v-container fluid>
    <v-row justify="center" class="login-form__background">
      <v-col cols="12" md="8" lg="4">
        <v-img
          class="mx-auto my-6"
          max-width="228"
          max-height="150"
          src="https://www.clicrbs.com.br/sites/swf/chorao/foto.png"
        />
        <v-card>
          <v-card-title class="headline">Login</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form ref="form">
              <v-row>
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
                  <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Senha
                    <a
                      class="text-caption text-decoration-none text-red"
                      href="/forgot-password"
                      rel="noopener noreferrer"
                    >
                      Esqueceu a senha?
                    </a>
                  </div>
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
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-btn color="primary" :loading="loading" @click="submit" rounded>
              <v-icon left>mdi-login</v-icon> Entrar
            </v-btn>
          </v-card-actions>
          <v-card-text class="text-center">
            <a class="text-red text-decoration-none" href="/register" rel="noopener noreferrer">
              Cadastre-se agora <v-icon icon="mdi-chevron-right"></v-icon>
            </a>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import { mapActions } from 'vuex';
import snackbarComponent from '@/components/global-snackbar.component.vue';
import User from '../../entities/user.entity';
import authService from '../../services/auth.service';
import RenderApp from '@/services/base/render.service';

@Component({
  components: {
    snackbarComponent,
  },
  methods: {
    ...mapActions([
      'setToken',
      'setIsAuthenticated',
      'setUser',
      'setIsLoading'
    ]),
  }
})
class LoginFormComponent extends Vue {
  private $router: any;
  private user: User = new User();
  private passwordVisible: boolean = false;
  private loading: boolean = false;

  public setIsAuthenticated!: Function;
  public setIsLoading!: Function;
  public setToken!: Function;
  public setUser!: Function;

  private submit(): void {
    this.loading = true;
    this.setIsLoading(true);

    authService.login(this.user)
      .then((response: any) => {
        this.setToken(response.token);
        this.setIsAuthenticated(true);
        RenderApp.getRequireInfo();
        this.setUser();
        setTimeout(() => {
          this.$router.push({ name: 'home' });
        }, 1000);
        this.$snackbar('Login realizado com sucesso!', 'success');
      })
      .catch((error: any) => {
        console.log(error);
        this.setIsLoading(false);
        this.$snackbar('Erro ao realizar login!', 'error');
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private goBack(): void {
    this.$router.go(-1);
  }

  private created() {
    this.setIsAuthenticated(false);
    window.localStorage.clear();
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