<template>
  <v-app>
    <section class="app-grid">
      <div v-show="isAuthenticated" class="app-menu">
        <nav-component />
      </div>
      <div class="app-content">
        <v-main>
          <v-container class="pa-0" fluid>
            <loader-component />
            <header-component v-show="isAuthenticated" />
            <router-view />
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

@Options({
  components: {
    headerComponent,
    navComponent,
    loaderComponent,
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
body {
  margin: 0px;
}

html {
  background-color: #e4e4e4;
}

.app-grid {
  display: flex;
}

.app-menu {
  margin-top: 95px;
  width: 320px;
}

.app-content {
  flex-grow: 1;
  padding: 30px 0px 0px 0px;
  width: 100%;
}
</style>
