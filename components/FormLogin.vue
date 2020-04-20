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
        @keyup.enter="loginSubmit()"
      ></v-text-field>
      <v-text-field
        label="Password"
        v-model="password"
        :rules="passwordRules"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        outlined
        required
        @click:append="show = !show"
        @keyup.enter="loginSubmit()"
      ></v-text-field>
      <MessageRedirect link='/forgotPassword' message='Forgot password?' />
      <SpacerExtraSmall />
      <MessageRedirect link="/signup" message="Not registered? Sign Up" />
    </v-form>
    <ButtonFormSubmit message='Log In' @submit="loginSubmit()" />
  </div>
</template>

<script>
import ButtonFormSubmit from '~/components/ButtonFormSubmit'
import MessageError from '~/components/MessageError'
import MessageRedirect from '~/components/MessageRedirect'
import SpacerExtraSmall from '~/components/SpacerExtraSmall'

import axios from 'axios'
axios.defaults.withCredentials = true;
const url = 'https://coach-easy-deploy.herokuapp.com';

export default {
  components: {
    ButtonFormSubmit,
    MessageError,
    MessageRedirect,
    SpacerExtraSmall
  },
  data: () => ({
      email: '',
      password: '',
      show: false,
      emailRules: [
        v => !!v || 'Email is required',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      errorMessage: 'Failed to Submit Form',
      error: false,
  }),
  methods:{
    loginSubmit: function () {
      try {
        var self = this;
        axios.post(`${url}/auth/login`, {
            email: self.email,
            password: self.password
          })
          .then(function (response){
            self.error = false
            self.$store.commit('setUserData', response.data.user)
            self.$store.commit('logIn')
            window.location.assign('/dashboard')
          })
          .catch(function (error){ 
            // on login promise failure
            self.errorMessage = self.getErrorMessage(error)
            self.error = true
            console.log(self.error)
          })
      } catch (error){
        self.error = true
      }
    },
    getErrorMessage: function(error) { 
      //error is the response from the server
      //during an erroneous axios request
      let status = error.response.status
      let errorMessage = ''
      switch (status){
        case 404:
          errorMessage = 'Invalid email or password entered';
          break;

        case 406:
          errorMessage = "Improper email format. Please check that your email is in the form example@email.com"
          break;

        case 500:
          errorMessage = "Uh oh, something unexpected happened. Please try again."
          break;

        default:
          errorMessage = "Uh oh, something unexpected happened. Please try again."
          break;
      }
      return errorMessage;
    },
  }
}
</script>
