<template>
  <v-layout class="global__nav">
    <v-navigation-drawer
      floating
      permanent
    >
      <v-list>
        <v-list-item
          :append-icon="isAdmin ? 'mdi-shield-crown' : ''"
          prepend-avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5FAPT67VhJt6hITfDXhnUp2cv5CDwsuyQvT7__kkOGErX88qJ"
          :subtitle="user.email"
          :title="user.name"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list density="default" nav>
        <router-link to="/home" class="nav__superimposed" exact-active-class="active-link">
          <v-list-item prepend-icon="mdi-home" title="Página inicial" value="shared"></v-list-item>
        </router-link>
        <router-link v-if="isAdmin" to="/admin" class="nav__superimposed" exact-active-class="active-link">
          <v-list-item prepend-icon="mdi-account" title="Painel do administrador" value="myfiles"></v-list-item>
        </router-link>
        <router-link v-else to="/me" class="nav__superimposed" exact-active-class="active-link">
          <v-list-item prepend-icon="mdi-account" title="Painel do usuário" value="myfiles"></v-list-item>
        </router-link>
        <router-link v-if="isAdmin" to="/skate-park-form" class="nav__superimposed" exact-active-class="active-link">
          <v-list-item prepend-icon="mdi-plus" title="Adicionar uma pista" value="myfiles"></v-list-item>
        </router-link>
        <router-link to="/skate-parks" class="nav__superimposed" exact-active-class="active-link">
          <v-list-item prepend-icon="mdi-skateboard" title="Lista de pistas" value="shared"></v-list-item>
        </router-link>
        <!-- <router-link to="/starred" class="nav__superimposed" exact-active-class="nav__starred">
          <v-list-item prepend-icon="mdi-star" title="Favoritos" value="starred"></v-list-item>
        </router-link> -->
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import User from '@/modules/Auth/entities/user.entity';

@Component
class NavComponent extends Vue {
  private user: User = new User();

  private componentIsMounted: boolean = false;
  
  private get isAdmin() {
    return !!this.user.isAdmin;
  }

  private created() {
    const userInfo = localStorage.getItem('user-info');

    if (userInfo) {
      const localStorageUser = JSON.parse(userInfo);

      
      this.user = localStorageUser;
    }
  }

  private mounted() {
    this.componentIsMounted = true;
  }
}
export default toNative(NavComponent);
</script>

<style lang="sass">
 .nav {
    &__superimposed {
      color: white !important;
      text-decoration: none !important;
    }
    &__starred {
      background-color: gold !important;
      text-decoration: none !important;
    }
  }
.active-link {
  background-color: #2196F3; /* Muda a cor de fundo do item ativo */
  color: red !important; /* Garante que o texto do item ativo seja branco */
}
</style>