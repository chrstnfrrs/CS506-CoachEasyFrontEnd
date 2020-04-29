<template>
  <div class="exerciseClientGrid">
    <div class="exerciseCol"><p> {{exercise.name}} </p></div>
    <div class="exerciseClientCol"><p> {{exercise.sets}} </p></div>
    <div class="exerciseClientCol"><p> {{exercise.reps}} </p></div>
    <div class="exerciseClientCol"><p> {{exercise.weight}} </p></div>
  </div>
</template>

<script>
export default {
  props: {
    exercise: Object,
  }
}
</script>

<style lang="scss">
  .exerciseCoachGrid {
    min-width: 325px;
    display: grid;
    grid-template-columns: minmax(50px, 1fr) 55px 55px;
    justify-items: center;
    justify-content: center;
    background: $background-secondary !important;
  }
  .exerciseClientGrid {
    min-width: 400px;
    display: grid;
    grid-template-columns: minmax(50px, 1fr) 55px 55px 75px;
    justify-items: center;
    justify-content: center;
    background: $background-secondary !important;
  }
  // .exerciseClientCol{
  //   display: flex;
  //   justify-content: center;
  // }
</style>