<template>
  <div class="pageContent">
    <Loading v-if="this.loading" />
    <MessageError :error="error" :message="errorMessage"/>
    <div v-if="!loading && !error">
      <ProfileUser :user="client"/>
      <FormAssignTemplate :shouldCreate="submitTemplate" :templates="templateList"/>
    </div>
  </div>
</template>

<script>
import Loading from '~/components/Loading'
import MessageError from '~/components/MessageError'
import ProfileUser from '~/components/ProfileUser'
import FormAssignTemplate from '~/components/FormAssignTemplate'
import axios from 'axios'
const url = 'https://coach-easy-deploy.herokuapp.com';
axios.defaults.withCredentials = true;

export default {
  components:{
    MessageError,
    Loading,
    ProfileUser,
    FormAssignTemplate
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
      templateList: undefined
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
  },
  mounted() {
    this.getUserClientsId();
  },
}
</script>
