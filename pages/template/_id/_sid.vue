<template>
  <div class="pageContent" >
    <Loading v-if="loading" />
    <MessageError v-if="error" :message="errorMessage" />
    <div v-if="!loading && !edit">
      <HeadingPage @sendRequest="setEdit()" status="Edit" :name="session.name"/>
      <SpacerSmall />
      <ListItem 
        v-for="(exercise) in this.exercises"
        :key="exercise.id"
        type="exercise"
        :items="exercise"/>
    </div>
    <div v-if="!loading && edit">
      <HeadingPage @sendRequest="saveRequest()" status="Save" :name="session.name"/>
      <SpacerSmall />
      <FormEditTemplate 
        :templateList="this.session"
      />
    </div>
  </div> 
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;
const url = 'https://coach-easy-deploy.herokuapp.com';

import HeadingPage from '~/components/HeadingPage'
import Loading from '~/components/Loading'
import MessageError from '~/components/MessageError'
import SpacerSmall from '~/components/SpacerSmall'
import ListItem from '~/components/ListItem'
import FormEditTemplate from '~/components/FormEditTemplate'

export default {
  components: {
    HeadingPage,
    Loading,
    MessageError,
    SpacerSmall,
    ListItem,
    FormEditTemplate
  },
  data: () => ({
    loading: true,
    loadingFailed: false,
    error: false,
    errorMessage: '',
    session: {},
    user: {},
    edit: false,
    exercises: []
  }),
  methods: {
    saveRequest: function(){
      this.setEdit();
    },
    setEdit: function(){
      this.edit = !this.edit
    },
    getUserSession: function(){
      Promise.all([ this.$store.state.userData ]).then( () => {
        this.user = this.$store.state.userData
        this.loading = false
        this.updateSession();
      },() => {
      })
    },
    updateSession: function() {
        let self = this;
        let tempID = this.$route.params.id
        let seshID = this.$route.params.sid
        let arg = self.user.role == 'COACH' ? `/coach/session?coach_session_id=${seshID}` : `/client/session?template_id=${tempID}&session_id=${seshID}`;
        axios.get(`${url}${arg}`).then(result => {
          if(self.user.role === 'COACH'){
            self.exercises = result.data.coach_exercises
          } else {
            self.exercises = result.data.exercises
          }
          self.session = result.data;
          self.loading = false;
          self.error = false;
        }).catch(error => {
          self.error = true;
          self.loading = false;
        }); 
    },
  },
  mounted() {
    this.getUserSession();
  }
}
</script>

<style lang="scss">
</style>