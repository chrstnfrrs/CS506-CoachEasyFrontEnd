<template>
  <div>
    <Loading v-if="!cardLoaded" />
    <MessageError v-if="error" :message="errorMessage" />
    <div v-if="cardLoaded">
      <nuxt-link :to="`/template/${template.slug}`">
        <v-card 
        class="dashCard">
          <div 
            class="dashContents">
            <v-icon size="75">mdi-weight-lifter</v-icon>
            <h2 class="subHeading">Current Plan</h2>
          </div>
        </v-card>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const url = 'https://coach-easy-deploy.herokuapp.com';
axios.defaults.withCredentials = true;

import Loading from '~/components/Loading'
import MessageError from '~/components/MessageError'
export default {
  components: {
    Loading,
    MessageError
  },
  props: {
    cardType: String,
    id: Number
  },
  data() {
    return {
      template: undefined,
      cardLoaded: false,
      error: false,
      errorMessage: ''
    }
  },
  mounted() {
    this.getCurrentTemplate();
  },
  methods: {
    getCurrentTemplate: function(){
      let self = this;
      axios.get(`${url}/client/template/active?user_id=${self.id}`)
      .then(result => {
        self.template = result.data;
        self.cardLoaded=true;
        this.setList();
      }).catch(error => {
        self.error = true;
        self.errorMessage = 'Failed to load current plan.'
        console.log(error)
      });
    },
  },
}
</script>
