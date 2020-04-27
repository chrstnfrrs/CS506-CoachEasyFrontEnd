<template>
<div>
  <div v-if="!edit" class="exerciseClientGrid">
    <div class="exerciseCol"><p> {{exercise.name}} </p></div>
    <div class="exerciseClientCol"><p> {{exercise.sets}} </p></div>
    <div class="exerciseClientCol"><p> {{exercise.reps}} </p></div>
    <div class="exerciseClientCol"><p> {{exercise.weight}} </p></div>
  </div>
  <div v-if="edit" class="exerciseClientGrid">
    <div class="exerciseCol"><p> {{exercise.name}} </p></div>
    <div class="exerciseClientCol"><v-text-field v-model="exercise.sets"> {{exercise.sets}} </v-text-field></div>
    <div class="exerciseClientCol"><v-text-field v-model="exercise.reps"> {{exercise.reps}} </v-text-field></div>
    <div class="exerciseClientCol"><v-text-field v-model="exercise.weight"> {{exercise.weight}} </v-text-field></div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    exercise: Object,
    edit: Boolean,
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
    .v-text-field{
      max-width: 40px;
      min-width: 30px;
      margin-left:12px;
      flex: 1;
    }
  }
  // .exerciseClientCol{
  //   display: flex;
  //   justify-content: center;
  // }
  .formCreateItem{

  }
  .smallItem{

  }
</style>