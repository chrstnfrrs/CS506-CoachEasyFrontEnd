<template>
  <v-app class="defaultLayout">
    <NavBar />
    <nuxt />
  </v-app>
</template>

<script>
import NavBar from '~/components/NavBar'
import Footer from '~/components/Footer'
export default {
  components:{
    NavBar,
    Footer
  },
}
</script>
