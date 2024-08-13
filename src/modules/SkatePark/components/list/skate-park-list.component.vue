<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1>Nossas pistas de skate</h1>
      </v-col>
      <v-col cols="12" v-if="skatePark.id">
        <v-card>
          <v-carousel>
            <v-carousel-item
              v-for="skatePark in skateParks"
              :key="skatePark.id"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
              <v-list-item-content>
                <v-list-item-title>{{ skatePark.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ skatePark.location }}</v-list-item-subtitle>
                <span>{{ skatePark.description }}</span>
              </v-list-item-content>
            </v-carousel-item>
          </v-carousel>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import skateParkService from '@/modules/SkatePark/services/skate-park.service';
import SkatePark from '../../entities/skate-park.entity';

@Component
class SkateParkListComponent extends Vue {
  private skateParks: SkatePark[] = [];

  private skatePark: SkatePark = new SkatePark();

  private getAllSkateParks() {
    skateParkService.getAll()
      .then((response: any[]) => {
        this.skateParks = response;

        this.skateParks.map((item: SkatePark) => {
          this.skatePark = new SkatePark(item);
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log('finally');
      });
  }

  private created() {
    this.getAllSkateParks();
  }
}
export default toNative(SkateParkListComponent);
</script>