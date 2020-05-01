<template>
  <div class="pageContent">
    Home
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    next(vm => { 
      console.log(vm.$store.state.userData)
      next();
    }) 
  }
}
</script>
