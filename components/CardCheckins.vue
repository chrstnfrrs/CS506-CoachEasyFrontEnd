<template>
  <div>
    <nuxt-link :to="`/${cardType}`">
      <v-card 
      class="dashCard">
        <div 
          class="dashContents">
          <v-icon size="75">mdi-account-details</v-icon>
          <h2 class="subHeading">Check Ins</h2>
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
    }
  },
}
</script>
