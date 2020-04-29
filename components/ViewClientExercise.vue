<template>
  <div class="exerciseClientGrid">
    <div class="exerciseClientCol exerciseFirstCol"><p> {{exercise.name}} </p></div>
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
