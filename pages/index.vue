<template>
  <HeroImage />
</template>

<script>
import HeroImage from '~/components/HeroImage'

export default {
  components: {
    HeroImage,
  },
  beforeRouteEnter(to, from, next) {
    next(vm => { 
      console.log(vm.$store.state.userData)
      next();
    }) 
  }
}
</script>
