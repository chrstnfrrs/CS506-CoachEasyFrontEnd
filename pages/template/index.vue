 <template>
  <div class="pageContent" >
    <Loading v-if="loading" />
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
      <MessageError v-if="error" :message="errorMessage" />
    </div>
    <div v-if="!loading && status">
      <HeadingPage @updateStatus="setStatus()" @sendRequest="request()" message="Exit" status="Create"/>
      <SpacerSmall />
      <FormCreateTemplate :shouldCreate="submitTemplate" />
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
      axios.post(`${url}/coach/template`, 
        self.submitTemplate
      ).then(function (response){
        self.updateTemplateList();
      }).catch(function (error){ 
          self.error = true
      });
      this.status = !this.status;

    },
    setDelete: function(){
      this.deleteStatus = !this.deleteStatus
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
      Promise.all([ this.$store.state.userData ])
      .then( () => {
        this.user = this.$store.state.userData
        console.log(this.user)
        this.loading = false
        this.updateTemplateList();
      },() => {
      })
    },
    updateTemplateList: function() {
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
      let self = this;
      axios.put(`${url}/coach/template/delete`, {
        "coach_template_id": template_id
      })
      .then(response => {
        self.updateTemplateList();
      })
      .catch(error => {
        self.error = true
        self.errorMessage = "Unable to delete template.";
      })
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
