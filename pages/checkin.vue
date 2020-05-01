<template>
  <div class="pageContent">
    <Loading v-if="loading" />
    <div v-if="!loading">
      <HeadingPage name="Check In" />
      {{checkin}}
      <h2>{{checkin.start_date}} - {{checkin.end_date}}</h2>
      <div v-if="!edit">
        <ViewSession v-for="session in checkin.sessions" :key="session.id" :session="session" :role="role" />
      </div>
      <div v-if="edit">
        <!-- <FormCompleteSession v-for="session in checkin.sessions" :key="session.id" :role="this.role"/> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;
const url = 'https://coach-easy-deploy.herokuapp.com';

import Loading from '~/components/Loading'
import HeadingPage from '~/components/HeadingPage'
import ViewSession from '~/components/ViewSession'
import FormCompleteSessionSession from '~/components/FormCompleteSession'

export default {
  components: {
    Loading,
    HeadingPage,
    ViewSession,
    FormCompleteSessionSession
  },
  data() {
    return {
      user: undefined,
      role: undefined,
      checkin: undefined,
      edit: false,
      loading: true,
    }
  },
  methods: {
    getUserData: function(){
      let self = this;
      Promise.all([ this.$store.state.userData ]).then( () => {
        console.log(this.$store.state.userData);
        self.user = this.$store.state.userData;
        self.role = this.$store.state.userData.role;
        self.getCheckin();
      },() => {
        self.loadingFailed = true
      })
    },
    getCheckin: function(){
      let self = this;
      let queryParams = "";
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const checkin_id = urlParams.get('checkin_id');
      if(checkin_id && self.user.role === 'COACH'){
        queryParams = `?checkin_id=${checkin_id}`;
      }else{
        queryParams = `?client_id=${self.user.id}`;
      } 
      axios.get(`${url}/checkin${queryParams}`)
      .then(result => {
        self.checkin = result.data;
        console.log('checkin');
        console.log(self.checkin);
        self.loading = false;
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