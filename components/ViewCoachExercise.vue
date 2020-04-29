<template>
  <div class="exerciseCoachGrid">
    <div class="exerciseCol"><p> {{exercise.name}} </p></div>
    <div class="exerciseClientCol"><p> {{exercise.sets}} </p></div>
    <div class="exerciseClientCol"><p> {{exercise.reps}} </p></div>
  </div>
</template>

<script>
export default {
  props: {
    exercise: Object,
  },
}
</script>

<style lang="scss">
</style>