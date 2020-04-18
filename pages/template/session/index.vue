<template>
  <div class="pageContent" >
    <Loading v-if="loading" :loading="this.loading"/>
    <div v-if="!loading && !status">
      <HeadingPage @updateStatus="setStatus()" message="Create"/>
      <SpacerSmall />
      <ListItem 
        v-for="(session) in this.sessionList"
        :key="session.id"
        :template="session"/>
      <MessageError :error="error" :message="errorMessage" />
    </div>
    <div v-if="!loading && status">
      <HeadingPage @updateStatus="setStatus()" message="Done"/>
      <SpacerSmall />
    </div>
  </div> 

</template>

<script>
import Loading from '~/components/Loading'
import HeadingPage from '~/components/HeadingPage'
import SpacerSmall from '~/components/SpacerSmall'
import ListItem from '~/components/ListItem'
import MessageError from '~/components/MessageError'

import axios from 'axios'
axios.defaults.withCredentials = true;
const url = 'https://coach-easy-deploy.herokuapp.com';

export default {
  components: {
    HeadingPage,
    Loading,
    SpacerSmall,
    ListItem,
    MessageError,
  },
  data() {
    return {
      loading: true,
      error: false,
      status: false,
      errorMessage: '',
      sessionList: [],
      user: {},
      creatable: false,
    }
  },
  methods: {
    setStatus: function(){
      this.status = !this.status;
    },
    getUsersession: function(){
      Promise.all([ this.$store.state.userData ]).then( () => {
        this.user = this.$store.state.userData
        this.loading = false
        this.updatesessionList();
      },() => {
        this.loadingFailed = true
      })
    },
    updatesessionList: function() {
        console.log('Update')
        let self = this;
        let arg = self.user.role == 'COACH' ? '/coach/session' : `/client/templates`;
        console.log(`${url}${arg}`)
        axios.get(`${url}${arg}`).then(result => {
          console.log(result)
          let list = result.data.templates.completed
          self.sessionList = result.data.templates;
          self.loading = false;
          self.error = false;
        }).catch(error => {
          self.error = true;
          self.errorMessage = "Unable to load content.";
          self.loading = false;
        }); 
    },
    setNoEdit: function() {
      this.$store.commit('noEdit');
    },
  },
  mounted() {
    this.getUsersession();
    this.setNoEdit();
  },
}
</script>
