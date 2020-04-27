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
    }
  },
  methods: {
    saveRequest: function(){
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
        }).catch(error => {
          self.error = true;
          self.loading = false;
        }); 
    },
    setNoEdit: function() {
      this.$store.commit('noEdit');
    },
  },
  mounted() {
    this.getUserTemplate();
    this.setNoEdit();
  },
}
</script>
