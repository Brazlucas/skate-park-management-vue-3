<template>
  <v-app>
    <section class="app-grid">
      <div v-show="isAuthenticated" class="app-menu">
        <nav-component />
      </div>
      <div :class="{ 'app-content': isAuthenticated, 'login-content': !isAuthenticated }">
        <v-main>
          <v-container class="pa-0" fluid>
            <loader-component />
            <header-component v-show="isAuthenticated" />
            <router-view />
            <global-snackbar />
          </v-container>
        </v-main>
      </div>
    </section>
  </v-app>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapGetters } from 'vuex';
import headerComponent from './components/header.component.vue';
import navComponent from './components/nav.component.vue';
import loaderComponent from './components/loader.component.vue';
import GlobalSnackbar from './components/global-snackbar.component.vue';

@Options({
  components: {
    headerComponent,
    navComponent,
    loaderComponent,
    GlobalSnackbar,
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
})
export default class App extends Vue {
  private isAuthenticated!: Function;
}
</script>

<style lang="scss">
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

html {
  background-color: #e4e4e4;
}

.app-grid {
  display: flex;
  height: 100vh;
}

.app-menu {
  margin-top: 95px;
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.login-content {
  flex-grow: 1;
  padding: 30px 0px 0px 0px;
  width: 100%;
}

.app-content {
  flex-grow: 1;
  margin-left: 250px; /* Mesma largura da nav para alinhar corretamente */
  height: 100vh;
  overflow-y: auto; /* Permite o scroll apenas no conteúdo */
  padding: 30px 0px;
  width: 100%;
}
</style>
