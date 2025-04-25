<template>
  <v-app>
    <section class="app-grid">
      <div v-show="isAuthenticated && isDesktop" class="app-menu">
        <nav-component v-show="isDesktop" />
      </div>
      <nav-mobile-component v-show="!isDesktop" v-model="mobileDrawer" />
      <div :class="{
        'app-content': isAuthenticated,
        'app-desktop': isAuthenticated && isDesktop,
        'login-content': !isAuthenticated
      }">
        <v-main>
          <v-container class="pa-0" fluid>
            <loader-component />
            <header-component v-show="isAuthenticated" @toggle-menu="openMobileMenu" />
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
import { useDisplay } from 'vuetify';
import headerComponent from './components/header.component.vue';
import navComponent from './components/nav.component.vue';
import navMobileComponent from './components/nav-mobile.component.vue';
import loaderComponent from './components/loader.component.vue';
import GlobalSnackbar from './components/global-snackbar.component.vue';

@Options({
  components: {
    headerComponent,
    navComponent,
    navMobileComponent,
    loaderComponent,
    GlobalSnackbar,
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  }
})
export default class App extends Vue {
  private isAuthenticated!: Function;

  private isDesktopValue = false;
  
  private mobileDrawer = false;

  public get isDesktop(): boolean {
    return this.isDesktopValue;
  }

  public openMobileMenu() {
    this.mobileDrawer = !this.mobileDrawer;
  }

  public mounted() {
    const display = useDisplay();

    this.isDesktopValue = display.mdAndUp.value;

    this.$watch(
      () => display.mdAndUp.value,
      (newVal) => {
        this.isDesktopValue = newVal;
      }
    );
  }
}
</script>


<style lang="scss">
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  font-family: "Lexend", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  letter-spacing: 0.5px;
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

.app-desktop {
  margin-left: 250px;
}

.app-content {
  flex-grow: 1;
  height: 100vh;
  overflow-y: auto;
  padding: 30px 0px;
  width: 100%;
}

.footer {
  background-color: #F443;
  z-index: 1 !important;
  color: #fff;
  font-size: 0.9rem;
  padding: 10px 0;
  justify-content: center;
}
</style>
