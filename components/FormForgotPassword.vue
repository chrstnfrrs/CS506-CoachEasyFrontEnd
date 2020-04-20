<template>
  <div>
    <MessageError v-if="error" :message="errorMessage" />
    <v-form class="userForm">
      <v-text-field
        class="userInput"
        label="Email"
        v-model="email"
        :rules="emailRules"
        outlined
        required
        @keyup.enter="forgotPassword()"
      ></v-text-field>
    </v-form>
    <ButtonFormSubmit message='Continue' @submit="forgotPassword()" />
  </div>
</template>

<script>
import ButtonFormSubmit from '~/components/ButtonFormSubmit'
import MessageError from '~/components/MessageError'

import axios from 'axios'
axios.defaults.withCredentials = true;

export default {
  components: {
    ButtonFormSubmit,
    MessageError
  },
  data: () => ({
    email: '',
    emailRules: [
      v => !!v || 'Email is required',
    ],
    errorMessage: "Failed to Submit Form",
    error: false,
  }),
  methods:{
    async forgotPassword() {
      try{
        var self = this;
        self.error = false
        await this.$axios.get(`https://coach-easy-deploy.herokuapp.com/forgotPassword?email=${this.email}`)
        .then(function (response){
          window.location.assign('/')
        })
        .catch(function (error){
          //if the forget password request fails
          self.errorMessage = self.getErrorMessage(error)
          self.error = true
        })
      } catch (error) {
        self.error = true
      }
    },
    getErrorMessage: function(error) { 
      //error is the response from the server
      //during an erroneous axios request
      let status = error.response.status
      let errorMessage = ''
      switch (status){
        case 400:
          errorMessage = 'An account with that email could not be found.'
          break;

        case 406:
          errorMessage = "Improper email format. Please check that your email is in the form example@email.com"
          break;

        default:
          errorMessage = "Uh oh, something unexpected happened. Please try again."
          break;
      }
      return errorMessage;
    },
  },
}
</script>
