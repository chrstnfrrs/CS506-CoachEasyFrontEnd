<template>
  <div class="pageContent">
    <Loading v-if="loading" />
    <div v-if="!loading">
      <HeadingPage />
      <SpacerSmall />
      <div v-if="checkins">
        <div id="completedCheckins" v-if="checkins.completed">
          <ListItem
            v-for="checkin in checkins.completed"
            status="complete"
            :key="checkin.id"
            type="checkin"
            :items="checkin"/>
        </div>
        <div id="uncompletedCheckin" v-if="checkins.uncompleted">
          <ListItem
            v-for="checkin in checkins.uncompleted"
            status="complete"
            :key="checkin.id"
            type="checkin"
            :items="checkin"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
const url = 'https://coach-easy-deploy.herokuapp.com';
axios.defaults.withCredentials = true;

import Loading from '~/components/Loading'
import HeadingPage from '~/components/HeadingPage'
import SpacerSmall from '~/components/SpacerSmall'
import ListItem from '~/components/ListItem'
export default {
  components:{
    Loading,
    HeadingPage,
    SpacerSmall,
    ListItem
  },
  data() {
    return {
      loading: false,
      user: undefined,
      checkins: undefined,
      nullVar: null,
      trueVar: true,
      falseVar: false,
    }
  },
  methods: {
    getUserData: function(){
      let self = this;
      Promise.all([ this.$store.state.userData ]).then( () => {
        self.user = this.$store.state.userData;
        self.getCheckins();
      },() => {
        self.loadingFailed = true
      })
    },
    getCheckins: function(){
      let self = this;
      let queryParams = "";
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const client_id = urlParams.get('client_id');
      if(client_id){
          queryParams = `?client_id=${client_id}`
      } else {
        if(this.user.role==="CLIENT"){
          queryParams = `?client_id=${self.user.id}`
        } else {
          
        }
      }
      axios.get(`${url}/client/checkins${queryParams}`)
      .then(result => {
        self.checkins = result.data;
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