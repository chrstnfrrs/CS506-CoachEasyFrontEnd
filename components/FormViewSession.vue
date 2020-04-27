<template>
  <div>
    <HeadingPage />
    <SpacerSmall v-if="this.$props.session.exercises" />
    <draggable v-if="!loading" v-model="exerciseList">
      <div v-if="role==='CLIENT'" :class="{mainDisplay: this.$props.session.exercises}">
        <div class="exerciseClientGrid exerciseClientGridHeader">
          <p class="exerciseCol">Name</p>
          <p class="exerciseCol">Sets</p>
          <p class="exerciseCol">Reps</p>
          <p class="exerciseCol">Weight</p>
        </div>
        <ViewClientExercise v-for="(exercise, index) in exerciseList" 
          :single="!loading"
          :key="index"
          :exercise="exercise" 
          :edit=true />
      </div>
      <div v-if="role==='COACH'">
        <ViewCoachExercise v-for="(exercise, index) in exerciseList" 
          :key="index" 
          :exercise="exercise"  />
      </div>
    </draggable>
  </div>
</template>

<script>

import axios from 'axios'
axios.defaults.withCredentials = true;
const url = 'https://coach-easy-deploy.herokuapp.com';

import HeadingPage from '~/components/HeadingPage'
import SpacerSmall from '~/components/SpacerSmall'
import ViewClientExercise from '~/components/ViewClientExercise'
import ViewCoachExercise from '~/components/ViewCoachExercise'
import draggable from 'vuedraggable'
export default {
  props: {
    session: Object
  },
  components: {
    HeadingPage,
    SpacerSmall,
    ViewClientExercise,
    ViewCoachExercise,
    draggable,
  },
  data() {
    return {
      exerciseList: [],
      role: '',
      loading: true,
      loadingFailed: false,
    }
  },
  methods: {
    getSessionRole: function(){
      Promise.all([ this.$store.state.userData ]).then( () => {
        this.role = this.$store.state.userData.role
        this.updateExerciseList();
        // this.loading = false
      },() => {
        this.loadingFailed = true
      })
    },
    updateExerciseList: function() {
      this.exerciseList = (this.role == 'COACH') ? 
        this.$props.session.coach_exercises : (this.$props.session.exercises) ? this.$props.session.exercises : this.$props.session.client_exercises;
      this.loading = false;
    }
  },
  mounted() {
    this.getSessionRole();
    console.log('form view session mounted');
  }
}
</script>

<style lang="scss">
.mainDisplay{
  border-radius: 16px;
  box-shadow: $elevation2;
  overflow: hidden;
}
.exerciseClientGridHeader{
  p{
    font-weight: 500;
  }
}
</style>