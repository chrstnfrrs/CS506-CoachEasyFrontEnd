<template>
  <div>
    <MessageError v-if="error" :message="errorMessage" />
    <v-form class="userForm">
      <v-text-field
        class="userInput"
        label="Password"
        v-model="password"
        :rules="passwordRules"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        outlined
        required
        @click:append="showPassword = !showPassword"
        @keyup.enter="resetPassword()"
      ></v-text-field>
      <v-text-field
        label="New password"
        v-model="newPassword"
        :rules="newPasswordRules"
        :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showNewPassword ? 'text' : 'password'"
        outlined
        required
        @click:append="showNewPassword = !showNewPassword"
        @keyup.enter="resetPassword()"
      ></v-text-field>
    </v-form>
    <ButtonFormSubmit message='Continue' @submit="resetPassword()" />
  </div>
</template>

<script>
import ButtonFormSubmit from '~/components/ButtonFormSubmit'
import MessageError from '~/components/MessageError'

import axios from 'axios'
axios.defaults.withCredentials = true;
const url = 'https://coach-easy-deploy.herokuapp.com';

export default {
  components: {
    ButtonFormSubmit,
    MessageError
  },
  data: () => ({
    password: '',
    newPassword: '',
    showPassword: false,
    showNewPassword: false,
    passwordRules: [
      v => !!v || 'Password is required',
    ],
    newPasswordRules: [
      v => !!v || 'New password is required',
    ],
    errorMessage: 'Failed to Submit Form',
    error: false,
  }),
  methods:{
    resetPassword: function() {
      var self = this;
      axios.post(`${url}/resetPassword`, {
        password: self.password,
        reset_token: self.$route.query.reset_token
      })
      .then(function (response){
        self.errorMessage = self.getErrorMessage(error)
        self.error = true
        window.location.assign('/login')
      })
      .catch(function (error){
        self.error = true
      })
    },
    getErrorMessage: function(error) { 
      //error is the response from the server
      //during an erroneous axios request
      let status = error.response.status
      let errorMessage = ''
      switch (status){
        case 400:
          errorMessage = 'Invalid reset session. Please request another one. '
          break;

        case 404:
          errorMessage = "Invalid reset session. Please request another one."
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
