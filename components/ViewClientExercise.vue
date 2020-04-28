<template>
<div>
  <div v-if="!edit" class="exerciseClientGrid">
    <div class="exerciseClientCol exerciseFirstCol"><p> {{exercise.name}} </p></div>
    <div class="exerciseClientCol"><p> {{exercise.sets}} </p></div>
    <div class="exerciseClientCol"><p> {{exercise.reps}} </p></div>
    <div class="exerciseClientCol"><p> {{exercise.weight}} </p></div>
  </div>
  <div v-if="edit" class="exerciseClientGrid">
    <div class="exerciseClientCol exerciseFirstCol"><p> {{exercise.name}} </p></div>
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
</style>