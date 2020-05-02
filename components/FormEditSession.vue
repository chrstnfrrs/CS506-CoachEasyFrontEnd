<template>
  <div>
    <FormEditExercise v-for="exercise in exerciseList" 
      :key="exercise.id" 
      :exercise="exercise" />
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;
const url = 'https://coach-easy-deploy.herokuapp.com';

import HeadingPage from '~/components/HeadingPage'
import FormEditExercise from '~/components/FormEditExercise'

export default {
  components: {
    HeadingPage,
    FormEditExercise
  },
  props: {
    session: Object,
  },
  data() {
    return {
      exerciseList: [],
      role: '',
      loading: false,
      // loadingFailed: false,
    }
  },
  methods: {
    getSessionEditRole: function(){
      Promise.all([ this.$store.state.userData ]).then( () => {
        this.role = this.$store.state.userData.role
        this.loading = false
      },() => {
        // this.loadingFailed = true
      })
    },
    componentSetup: function(){
      this.getSessionEditRole();
      this.exerciseList = (this.role == 'COACH') ? this.$props.session.coach_exercises : this.$props.session.client_exercises;
    }
  },
  mounted() {
    this.componentSetup()
  }
}
</script>

<style>
</style>