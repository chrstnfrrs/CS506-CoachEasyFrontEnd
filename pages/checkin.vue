<template>
  <div class="pageContent">
    <Loading v-if="loading" />
    <div v-if="!loading && loggedIn">
      <HeadingPage :name="`Check In - ${checkin.template_name}`" @updateStatus="editSession()" :status="this.editMessage"/>
      <h3>{{checkin.check_in.start_date}} - {{checkin.check_in.end_date}}</h3>
      <SpacerSmall />
      <div v-if="!edit">
        <ViewCheckin :checkin="this.checkin" :role="role"/>
      </div>
      <div v-if="edit">
        <FormCompleteCheckin @complete="completeCheckin()" :checkin="this.checkin" />
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
import SpacerSmall from '~/components/SpacerSmall'
import ViewCheckin from '~/components/ViewCheckin'
import FormCompleteCheckin from '~/components/FormCompleteCheckin'

export default {
  components: {
    Loading,
    HeadingPage,
    ViewCheckin,
    FormCompleteCheckin,
    SpacerSmall
  },
  data() {
    return {
      user: undefined,
      role: undefined,
      checkin: undefined,
      edit: false,
      loading: true,
      loggedIn: undefined,
      editMessage: "Start",
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
        self.loading = false;
      }).catch(error => {
        self.error = true;
        console.log(error)
      });
    },
    editSession: function() {
      this.edit = !this.edit;
      this.editMessage = this.edit ? "Cancel" : "Start";
    },
    completeCheckin: function() {
      this.edit = false;
      this.getCheckin();
      console.log('completing checkin');
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => { 
      if(vm.$store.state.loggedIn){
        vm.loggedIn = vm.$store.state.loggedIn;
      } else {
        window.location.href = "/"
      }
      next();
    }) 
  },
  mounted() {
    this.getUserData();
  },
}
</script>

<style>

</style>
