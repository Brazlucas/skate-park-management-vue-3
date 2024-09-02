<template>
  <v-card class="global">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card-title class="global__content__card__title d-flex justify-space-between">
          <span>Pistas de skate <v-icon>mdi-skateboard</v-icon></span>
          <v-btn icon @click="changeListView">
            <v-icon>{{ !listView ? 'mdi-view-headline' : 'mdi-view-carousel'}}</v-icon>
          </v-btn>
        </v-card-title>
        <template v-if="skatePark.id">
          <v-col cols="12" v-if="!listView">
            <v-carousel
              hide-delimiters
              height="525"
              hide-delimiter-background
            >
              <v-carousel-item
                v-for="skatePark in skateParks"
                :key="skatePark.id"
                src="https://i.ytimg.com/vi/DlNDN-T6HNk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCBFrJjCa7KQAykUxv7pGwiOoFyyg"
              >
                <div class="carousel-informations">
                  <v-list-item-content>
                    <v-list-item-title
                      class="global__content__card__title"
                    >
                      {{ skatePark.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="global__content__card__subtitle mt-5">{{ skatePark.location }}</v-list-item-subtitle>
                    <p class="mt-5">{{ skatePark.description }}</p>
                  </v-list-item-content>
                  <router-link :to="`/rent/${skatePark.id}`" class="nav__superimposed">
                    <div class="carousel-informations__more">
                      <span><i>Reservar</i></span>
                    </div>
                  </router-link>
                </div>
              </v-carousel-item>
            </v-carousel>
          </v-col>
          <v-col v-else>
            <v-data-table
              :items="skateParks"
              hide-default-footer
            ></v-data-table>
          </v-col>
        </template>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import skateParkService from '@/modules/SkatePark/services/skate-park.service';
import SkatePark from '../../entities/skate-park.entity';

@Component
class SkateParkListComponent extends Vue {
  private skateParks: SkatePark[] = [];

  private skatePark: SkatePark = new SkatePark();

  private listView: boolean = false;

  private changeListView() {
    this.listView = !this.listView;
  }

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

<style lang="sass" scoped>
.carousel-informations {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 10px;
  border-radius: 8px;
  &__more {
    margin-top: 30px;
    cursor: pointer;
    color: red
  }
}
</style>