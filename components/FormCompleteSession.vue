<template>
  <div>
    {{ session }}
    <HeadingSection :text="session.name" />
    <SpacerExtraSmall />
    <div class="mainDisplay">
      <div class="secondaryDisplay">
        <v-text-field
          label="Body Weight"
          v-model="session.client_weight">
        </v-text-field>
      </div>
      <div class="exerciseClientGrid exerciseClientGridHeader">
        <p class="exerciseClientCol exerciseFirstCol">Name</p>
        <p class="exerciseClientCol">Sets</p>
        <p class="exerciseClientCol">Reps</p>
        <p class="exerciseClientCol">Weight</p>
      </div>
      <FormClientExercise v-for="(exercise, index) in exerciseList" 
        :single="!loading"
        :key="index"
        :exercise="exercise" 
        :edit=true />
      <div class="secondaryDisplay">
        <v-text-field
          label="Comment"
          v-model="session.comment">
        </v-text-field>
      </div>
      <div v-if="role==='COACH'">
        <ViewCoachExercise v-for="(exercise, index) in exerciseList" 
          :key="index" 
          :exercise="exercise"  />
      </div>
      <ButtonViewSession @complete="completeSession()" :session="this.session" action="Complete" />
    </div>
  </div>
</template>

<script>

import axios from 'axios'
axios.defaults.withCredentials = true;
const url = 'https://coach-easy-deploy.herokuapp.com';

import HeadingSection from '~/components/HeadingSection'
import SpacerExtraSmall from '~/components/SpacerExtraSmall'
import FormClientExercise from '~/components/FormClientExercise'
import ViewCoachExercise from '~/components/ViewCoachExercise'
import ButtonViewSession from "~/components/ButtonViewSession"

export default {
  props: {
    session: Object
  },
  components: {
    SpacerExtraSmall,
    FormClientExercise,
    ViewCoachExercise,
    HeadingSection,
    ButtonViewSession
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
    },
    completeSession: function() {
      this.$emit('complete');
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
.secondaryDisplay{
  margin: 8px 0px 8px 16px !important;
}
.exerciseClientGridHeader{
  p{
    font-weight: 500;
  }
}
</style>