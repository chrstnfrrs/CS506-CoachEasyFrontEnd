<template>
  <div class="pageContent">
    <Loading v-if="loading"/>
    <MessageError v-if="error" :message="errorMessage"/>
    <ProfileUser v-if="!loading && !error" :user="client"/>
  </div>
</template>

<script>
import Loading from '~/components/Loading'
import MessageError from '~/components/MessageError'
import ProfileUser from '~/components/ProfileUser'
import axios from 'axios'
const url = 'https://coach-easy-deploy.herokuapp.com';
axios.defaults.withCredentials = true;

export default {
  components:{
    MessageError,
    Loading,
    ProfileUser
  },
  data() {
    return {
      client: {},
      loading: true,
      error: false,
      errorMessage: ''
    }
  },
  methods: {
    findClient: function(){
      const self = this;
      const id = this.$route.params.id
      axios.get(`${url}/getUser?id=${id}`)
      .then(result => {
        self.client = result.data.user
        self.loading = false;
      }).catch(error => {
        self.loading = false;
        self.error = true;
        self.errorMessage = "Cannot Find User."
      });
    }
  },
  mounted() {
    this.findClient();
  },
}
</script>
