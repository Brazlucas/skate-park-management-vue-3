<template>
  <v-app>
    <section class="app-grid">
      <div class="app-content">
        <v-main>
          <v-container class="pa-0" fluid>
            <router-view></router-view>
          </v-container>
        </v-main>
      </div>
    </section>
  </v-app>
</template>

<style lang="scss">
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
