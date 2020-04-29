<template>
  <div v-if="cardLoaded">
    <nuxt-link :to="`/`">
      <v-card 
      class="dashCard">
        <div 
          class="dashContents">
          <v-icon size="75">mdi-weight-lifter</v-icon>
          <h2 class="subHeading">Current Plan</h2>
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
  mounted() {
    
  },
  methods: {
    
  },
}
</script>
