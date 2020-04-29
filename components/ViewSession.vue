<template>
  <div>
    <HeadingSection :text="session.name" />
    <SpacerExtraSmall />
    <div class="mainDisplay">
      <div v-if="session.weight" class="secondaryDisplay">
        <strong>Weight</strong>
        <p>{{session.weight}}</p>
      </div>
      <div class="exerciseClientGrid exerciseClientGridHeader">
        <p class="exerciseClientCol exerciseFirstCol">Name</p>
        <p class="exerciseClientCol">Sets</p>
        <p class="exerciseClientCol">Reps</p>
        <p class="exerciseClientCol">Weight</p>
      </div>
      <ViewClientExercise v-for="(exercise, index) in exerciseList" 
        :key="index"
        :exercise="exercise" />
      <div v-if="session.comment" class="secondaryDisplay">
        <strong>Comment</strong>
        <p>{{session.comment}}</p>
      </div>
    </div>
    <SpacerExtraSmall />
  </div>
</template>

<script>

import axios from 'axios'
axios.defaults.withCredentials = true;
const url = 'https://coach-easy-deploy.herokuapp.com';

import HeadingSection from '~/components/HeadingSection'
import SpacerExtraSmall from '~/components/SpacerExtraSmall'
import ViewClientExercise from '~/components/ViewClientExercise'
import ViewCoachExercise from '~/components/ViewCoachExercise'
export default {
  props: {
    session: Object,
    role: String
  },
  components: {
    HeadingSection,
    SpacerExtraSmall,
    ViewClientExercise,
    ViewCoachExercise,
  },
  data() {
    return {
      loading: true,
      exerciseList: [],
      loading: true,
      loadingFailed: false,
    }
  },
  methods: {
    updateExerciseList: function() {
      if(this.$props.role == 'COACH'){
        this.exerciseList = this.$props.session.coach_exercises ;
      } else if(this.$props.session.exercises){
        this.exerciseList = this.$props.session.exercises;
      } else if(this.$props.session.training_entries){
        this.exerciseList = this.$props.session.training_entries
      } else {
        this.exerciseList = this.$props.session.client_exercises
      }
      this.loading = false;
    }
  },
  mounted() {
    this.updateExerciseList();
  }
}
</script>

<style lang="scss">
.mainDisplay{
  border-radius: 16px;
  padding: 8px;
  box-shadow: $elevation2;
  overflow: hidden;
}
.secondaryDisplay{
  margin: 8px 0px 8px 16px !important;
}
.exerciseClientGridHeader{
  height: 40px;
  align-items: center;
  p{
    font-size: 16px;
    font-weight: 500;
  }
}
</style>