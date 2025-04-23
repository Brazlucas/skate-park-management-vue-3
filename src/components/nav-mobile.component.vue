<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="left"
    class="mobile-drawer"
  >
    <v-list>
      <v-list-item
        class="icon"
        :append-icon="isAdmin ? 'mdi-shield-crown' : ''"
        prepend-avatar="https://cdn.shopify.com/s/files/1/1566/2889/files/Tony-Hawk-8.jpg?v=1625823277"
        :subtitle="user.email"
        :title="user.name"
      ></v-list-item>
    </v-list>

    <v-divider />

    <v-list nav>
      <router-link to="/home" class="nav__superimposed" exact-active-class="active-link">
        <v-list-item prepend-icon="mdi-home" title="Página inicial" value="home" />
      </router-link>

      <router-link v-if="isAdmin" to="/admin-form" class="nav__superimposed" exact-active-class="active-link">
        <v-list-item prepend-icon="mdi-account" title="Painel do administrador" value="admin" />
      </router-link>

      <router-link v-else to="/user-form" class="nav__superimposed" exact-active-class="active-link">
        <v-list-item prepend-icon="mdi-account" title="Painel do usuário" value="user" />
      </router-link>

      <router-link v-if="!isAdmin" to="/skate-parks" class="nav__superimposed" exact-active-class="active-link">
        <v-list-item prepend-icon="mdi-skateboard" title="Lista de pistas" value="parks" />
      </router-link>

      <router-link v-if="!isAdmin" to="/chat-bot" class="nav__superimposed" exact-active-class="active-link">
        <v-list-item prepend-icon="mdi-help-circle" title="Ajuda" value="chatbot" />
      </router-link>

      <div @click="logout" class="nav__superimposed" exact-active-class="active-link">
        <v-list-item prepend-icon="mdi-exit-to-app" title="Sair" value="logout" />
      </div>

    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-facing-decorator';
import authService from '@/modules/Auth/services/auth.service';
import User from '@/modules/Auth/entities/user.entity';

@Component
export default class NavMobileComponent extends Vue {
  @Prop({ default: false }) public modelValue!: boolean;

  public user: User = new User();

  public get drawer() {
    return this.modelValue;
  }

  public set drawer(val: boolean) {
    this.$emit('update:modelValue', val);
  }

  // public get isAdmin(): boolean {
  //   return this.user?.profile === 'admin';
  // }

  public mounted() {
    const userInfo = localStorage.getItem('user-info');
    if (userInfo) {
      this.user = JSON.parse(userInfo);
    }
  }

  private logout() {
    authService.logout();
  }
}
</script>

<style scoped lang="scss">
.mobile-drawer {
  margin-top: 64px;
}
.nav__superimposed {
  text-decoration: none;
  color: inherit;
}
.active-link {
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 8px;
}
</style>
