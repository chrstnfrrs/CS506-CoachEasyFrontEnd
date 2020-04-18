<template>
  <div class="pageContent" >
    <Loading v-if="loading" :loading="this.loading"/>
    <div v-if="!loading && !status">
      <HeadingPage @updateStatus="setStatus()" @sendRequest="request()" message="New" :status="deleteMessage"/>
      <SpacerSmall />
      <ListItem 
        v-for="(template) in this.templateList"
        :deleteStatus="deleteStatus"
        :key="template.id"
        type="template"
        :items="template"
        @sendDelete="deleteTemplate(template.id)"/>
      <MessageError :error="error" :message="errorMessage" />
    </div>
    <div v-if="!loading && status">
      <HeadingPage v-if="creatable" @updateStatus="setStatus()" @sendRequest="request()" message="Exit" status="Create"/>
      <HeadingPage v-if="!creatable" @updateStatus="setStatus()" @sendRequest="request()" message="Exit"/>
      <SpacerSmall />
      <FormCreateTemplate @creatable="isCreatable()" @notCreatable="isNotCreatable()" :shouldCreate="submitTemplate" />
    </div>
  </div> 

</template>

<script>
import Loading from '~/components/Loading'
import HeadingPage from '~/components/HeadingPage'
import SpacerSmall from '~/components/SpacerSmall'
import ListItem from '~/components/ListItem'
import FormCreateTemplate from '~/components/FormCreateTemplate'
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
    FormCreateTemplate,
    MessageError,
  },
  data() {
    return {
      loading: true,
      error: false,
      status: false,
      submitTemplate: {
        name: '',
        sessions: []
      },
      deleteStatus: false,
      errorMessage: '',
      templateList: [],
      user: {},
      creatable: false,

    }
  },
  computed: {
    deleteMessage: function(){
      if(!this.deleteStatus){
        return "Edit"
      } else {
        return "Done"
      }
    }
  },
  methods: {
    request: function(){
      if(this.status){
        this.createRequest();
      } else if(!this.status){
        this.setDelete();
      }
    },
    createRequest: function(){
      let self = this;
      try {
        axios.post(`${url}/coach/template`, 
          self.submitTemplate
        ).then(function (response){
          console.log(response);
          self.updateTemplateList();
        }).catch(function (error){ 
            self.error = true
        });
      } catch (error) {
        this.error = true;
      }
      console.log('saving')
      this.status = !this.status;

    },
    setDelete: function(){
      this.deleteStatus = !this.deleteStatus
    },
    deleteRequest: function(){
      console.log('deleting')
    },
    setStatus: function(){
      this.submitTemplate = 
      {
        name: '',
        sessions: []
      },
      this.status = !this.status;
    },
    getUserTemplate: function(){
      Promise.all([ this.$store.state.userData ]).then( () => {
        this.user = this.$store.state.userData
        this.loading = false
        this.updateTemplateList();
      },() => {
        this.loadingFailed = true
      })
    },
    updateTemplateList: function() {
        console.log('Update')
        let self = this;
        let arg = self.user.role == 'COACH' ? '/coach/templates' : `/client/templates?user_id=${self.user.id}`;
        axios.get(`${url}${arg}`).then(result => {
          self.templateList = result.data.templates;
          self.loading = false;
          self.error = false;
        }).catch(error => {
          self.error = true;
          self.errorMessage = "Unable to load content.";
          self.loading = false;
        }); 
    },
    deleteTemplate: function(template_id) {
      try {
        axios.put(`${url}/coach/template/delete`, 
        {
          "coach_template_id": template_id
        }).then(response => {
          console.log(response);
          this.updateTemplateList();
        }).catch(error => {
          console.log(error);
        })
      } catch (error) {
        this.error = true;
      }
    },
    setNoEdit: function() {
      this.$store.commit('noEdit');
    },
    setCreatable: function() {
      console.log("creatable is changing");
      this.creatable = false;
    },
    isCreatable: function() {
      this.creatable = true;
    },
    isNotCreatable: function() {
      this.creatable = false;
    }
  },
  mounted() {
    this.getUserTemplate();
    this.setNoEdit();
  },
}
</script>
