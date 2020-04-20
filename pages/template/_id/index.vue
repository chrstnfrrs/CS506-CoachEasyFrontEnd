<template>
  <div class="pageContent" >
    <Loading v-if="loading" :loading="this.loading"/>
    <MessageError v-if="error" :message="errorMessage" />
    <div v-if="!loading && !edit">
      <HeadingPage @sendRequest="setEdit()" status="Edit" :name="templateList.name"/>
      <SpacerSmall />
      <ListItem 
        v-for="(session) in this.templateList.sessions"
        :key="session.id"
        :type="`template/${templateList.id}`"
        :items="session"/>
    </div>
    <div v-if="!loading && edit">
      <HeadingPage @sendRequest="saveRequest()" status="Save" :name="templateList.name"/>
      <SpacerSmall />
      <FormEditTemplate 
        :templateList="this.templateList"
      />
    </div>
  </div> 
</template>

<script>
import Loading from '~/components/Loading'
import HeadingPage from '~/components/HeadingPage'
import SpacerSmall from '~/components/SpacerSmall'
import ListItem from '~/components/ListItem'
import FormEditTemplate from '~/components/FormEditTemplate'
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
    FormEditTemplate,
    MessageError,
  },
  data() {
    return {
      loading: true,
      error: false,
      status: false,
      role: '',
      edit: false,
      errorMessage: 'Failed to Load Template',
      templateList: {},
      user: {},
      sessionCountBefore: 0,
    }
  },
  methods: {
    saveRequest: function(){
      this.addNewSessions();
      this.setEdit();
    },
    setEdit: function(){
      this.edit = !this.edit
    },
    getUserTemplate: function(){
      Promise.all([ this.$store.state.userData ]).then( () => {
        this.user = this.$store.state.userData
        this.loading = false
        this.updateTemplateList();
      },() => {
      })
    },
    updateTemplateList: function() {
        let self = this;
        let route = this.$route.params.id
        let arg = self.user.role == 'COACH' ? `/coach/template?coach_template_id=${route}` : `/client/template?id=${route}`;
        axios.get(`${url}${arg}`).then(result => {
          self.templateList = result.data;
          self.loading = false;
          self.error = false;
          self.sessionCountBefore = self.templateList.sessions.length;
        }).catch(error => {
          self.error = true;
          self.loading = false;
        }); 
    },
    setNoEdit: function() {
      this.$store.commit('noEdit');
    },
    addNewSessions: function() {
      // create new sessions so that they can be updated in the template
      if (this.sessionCountBefore != this.templateList.sessions.length) {
        for (let i = this.sessionCountBefore; i < this.templateList.sessions.length; i++) {
          axios.post(`${url}/coach/session`, {
            coach_template_id: this.templateList.id,
            name: this.templateList.sessions[i].name,
            order: this.templateList.sessions[i].order,
            coach_exercises: this.templateList.sessions[i].coach_exercises
          }).then(result => {
            console.log(result);
          }).catch(error => {
            this.error = true;
          });
        }
      }

      // update the template
      console.log(this.templateList);
      axios.put(`${url}/coach/template`, this.templateList).then( result => {
        console.log(result);
        this.updateTemplateList();
      }).catch(error => {
        this.error = true;
        console.log('error updating template');
      });
    },
  },
  mounted() {
    this.getUserTemplate();
    this.setNoEdit();
  },
}
</script>
