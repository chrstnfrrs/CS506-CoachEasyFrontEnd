<template>
  <div class="pageContent">
    <div v-if="!loading && view">
      <ViewSession :session="this.session" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;
const url = 'https://coach-easy-deploy.herokuapp.com';

import ViewSession from '~/components/ViewSession'

export default {
  components: {
    ViewSession
  },
  data() {
    return {
      session: undefined,
      loading: true,
      id: undefined,
      view: true,
    }
  },
  methods: {
    getSessionEditRole: function(){
      Promise.all([ this.$store.state.userData ]).then( () => {
        this.id = this.$store.state.userData.id
        this.getNextSession(this.$store.state.userData.id)
      },() => {
        this.loadingFailed = true
      })
    },
    getNextSession: function(id){
      axios.get(`${url}/client/session/next?client_id=${id}`).then(result => {
        this.session = result.data;
        this.loading = false
      }).catch(error => {
        console.log('error')
      });
    },
  },
  mounted(){
    console.log('here')
    this.getSessionEditRole();
  }
}
</script>

<style lang="scss">
</style>