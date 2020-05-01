<template>
  <div class="pageContent">
    <Loading v-if="loading" />
    <div v-if="!loading">
      <HeadingPage name="Training Log" />
      <SpacerSmall />
      <ViewSession 
        v-for="s in trainingLog.sessions"
        :key="s.id"
        :role="user.role"
        :session="s" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;
const url = 'https://coach-easy-deploy.herokuapp.com';

import Loading from '~/components/Loading'
import HeadingPage from '~/components/HeadingPage'
import SpacerSmall from '~/components/SpacerSmall'
import ViewSession from '~/components/ViewSession'

export default {
  components: {
    Loading,
    HeadingPage,
    SpacerSmall,
    ViewSession,
  },
  data() {
    return {
      loading: true,
      trainingLog: undefined,
      user: undefined
    }
  },
  methods: {
    getUserData: function(){
      let self = this;
      Promise.all([ this.$store.state.userData ]).then( () => {
        self.user = this.$store.state.userData;
        self.getTrainingLog();
      },() => {
        self.loadingFailed = true
      })
    },
    setLoading: function(){
      this.loading=false;
    },
    getTrainingLog: function(){
      let self = this;
      let reqID = -1;
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const client_id = urlParams.get('client_id');
      if(self.user.role === 'CLIENT'){
        reqID = self.user.id
      } else {
        reqID = client_id
      }
      axios.get(`${url}/client/trainingLog?client_id=${reqID}`)
      .then(result => {
        self.trainingLog = result.data
        self.setLoading();
        self.error = false;
      }).catch(error => {
        self.error = true;
        console.log(error)
      });
    }
  },
  mounted() {
    this.getUserData();
  },
}
</script>

<style>

</style>