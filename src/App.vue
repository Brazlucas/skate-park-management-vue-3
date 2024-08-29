<template>
  <v-app>
    <section class="app-grid">
      <div class="app-content">
        <v-main>
          <v-container class="pa-0" fluid>
            <div v-show="isAuthenticated">
              <header-component />
            </div>
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

@Options({
  components: {
    headerComponent,
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

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
  width: auto;
}
.app-content {
  padding: 30px 50px 50px;
  width: 100%;
}
</style>
