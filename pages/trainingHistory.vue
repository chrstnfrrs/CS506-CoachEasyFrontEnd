<template>
  <div class="pageContent flexColumn">
    <HeadingPage name="Training History"/>
    <SpacerSmall />
    <nuxt-link to="/trainingLog?index=1"><p class="historyItem">View Training Log</p></nuxt-link>
    <nuxt-link to="/template"><p class="historyItem">View Previous Templates</p></nuxt-link>
    <nuxt-link to="/checkins"><p class="historyItem">View Previous Checkins</p></nuxt-link>
  </div>
</template>

<script>
import HeadingPage from '~/components/HeadingPage'
import SpacerSmall from '~/components/SpacerSmall'
export default {
  components:{
    HeadingPage,
    SpacerSmall
  }

}
</script>

<style lang="scss">
.flexColumn{
  flex-direction: column;
}
.historyItem{
  text-decoration: underline !important;
  margin-bottom: 8px !important;
}
</style>