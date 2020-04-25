<template>
  <div class="pageContent">
    <Loading v-if="this.loading" />
    <MessageError :error="error" :message="errorMessage"/>
    <div v-if="!loading && !error">
      <ProfileUser :user="client"/>
      <FormAssignTemplate @assignTemplate="assignTemplate" :shouldCreate="submitTemplate" :templates="templateList"/>
      <ViewTemplate :template="submitTemplate" />
    </div>
  </div>
</template>

<script>
import Loading from '~/components/Loading'
import MessageError from '~/components/MessageError'
import ProfileUser from '~/components/ProfileUser'
import FormAssignTemplate from '~/components/FormAssignTemplate'
import ViewTemplate from '~/components/ViewTemplate'
import axios from 'axios'
const url = 'https://coach-easy-deploy.herokuapp.com';
axios.defaults.withCredentials = true;

export default {
  components:{
    MessageError,
    Loading,
    ProfileUser,
    FormAssignTemplate,
    ViewTemplate
  },
  data() {
    return {
      client: {},
      loading: true,
      error: false,
      errorMessage: '',
      submitTemplate: {
        name: '',
        sessions: []
      },
      user: undefined,
      templateList: undefined,
      selectedTemplate: undefined,
      hasTemplate: false,
      clientTemplateId: undefined,
    }
  },
  methods: {
    getUserClientsId: function(){
      Promise.all([ this.$store.state.userData ]).then( () => {
        this.user = this.$store.state.userData
        this.findClient();
      },() => {
        this.loadingFailed = true
      })
    },
    findClient: function(){
      const self = this;
      const id = this.$route.params.id
      axios.get(`${url}/getUser?id=${id}`)
      .then(result => {
        self.client = result.data.user
        self.updateTemplateList();
      }).catch(error => {
        self.loading = false;
        self.error = true;
        self.errorMessage = "Cannot Find User."
      });
    },
    updateTemplateList: function() {
        let self = this;
        let arg = self.user.role == 'COACH' ? '/coach/templates' : `/client/templates?user_id=${self.user.id}`;
        axios.get(`${url}${arg}`).then(result => {
          console.log(result.data.templates)
          self.templateList = result.data.templates;
          self.loading = false;
          self.error = false;
        }).catch(error => {
          self.error = true;
          self.errorMessage = "Unable to load content.";
          self.loading = false;
        }); 
    },
    assignTemplate(template) {
      this.submitTemplate = template;
      if (!this.hasTemplate) {
        const Role = {
          COACH: "COACH",
          CLIENT: "CLIENT",
        };
        Object.freeze(Role);
        axios.post(`${url}/client/template`, {
          role: Role.COACH,
          template_id: this.submitTemplate.id,
          client_id: this.$route.params.id,
          sessions: this.submitTemplate.sessions
        }).then(result => {
          console.log(result);
          this.hasTemplate = true;
        }).catch(error => {
          console.log(error);
        });
      } else {
        this.updateAssignedTemplate(template);
      }
    },
    updateAssignedTemplate: function(template) {
      axios.put(`${url}/client/template`,{
        id: this.clientTemplateId,
        user_id: this.$route.params.id,
        sessions: template.sessions,
        name: template.name
      }).then(result => {
        console.log(result);
      }).catch(error => {
        console.log(error);
      });
    },
    getClientTemplate: function() {
      axios.get(`${url}/client/template/active?user_id=${this.$route.params.id}`).then(templateResult => {
        console.log('active template');
        console.log(templateResult.data);
        if (templateResult.data) {
          this.hasTemplate = true;
          this.submitTemplate.name = templateResult.data.name;
          this.submitTemplate.sessions = templateResult.data.sessions;
          this.submitTemplate = templateResult.data;
          this.clientTemplateId = templateResult.data.id;
        }
      }).catch(error => {
        console.log(error);
      })
    }
  },
  mounted() {
    this.getUserClientsId();
    this.getClientTemplate();
  },
}
</script>
