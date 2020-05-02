<template>
  <div v-if="cardLoaded">
    <nuxt-link :to="`/${cardType}`">
      <v-card 
      class="dashCard">
        <div 
          class="dashContents">
          <v-icon size="75">mdi-folder</v-icon>
          <h2 class="subHeading">Templates</h2>
        </div>
      </v-card>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    cardType: String,
  },
  data() {
    return {
      cardLoaded: true,
    }
  },
}
</script>
