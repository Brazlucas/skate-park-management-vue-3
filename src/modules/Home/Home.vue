<template>
  <v-row no-gutters>
    <v-col cols="12">
      <div class="home">
        <h1>Aluguéis de pistas de skate</h1>
      </div>
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col cols="12">
      <ul>
        <li><router-link to="/rentals">Alugar uma pista</router-link></li>
        <li><router-link to="/skate-parks">Pistas de skate</router-link></li>
      </ul>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';

@Component
class Home extends Vue {}
export default toNative(Home);
</script>
