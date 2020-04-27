<template>
  <div>
    <MessageError v-if="error" :message="errorMessage" />
    <v-form class="userForm">
      <v-text-field
        class="userInput"
        label="First name"
        v-model="firstName"
        :rules="firstNameRules"
        outlined
        required
        @keyup.enter="signUp()"
      ></v-text-field>
      <v-text-field
        class="userInput"
        label="Last name"
        v-model="lastName"
        :rules="lastNameRules"
        outlined
        required
        @keyup.enter="signUp()"
      ></v-text-field>
      <v-text-field
        class="userInput"
        label="Email"
        v-model="email"
        :rules="emailRules"
        outlined
        required
        @keyup.enter="signUp()"
      ></v-text-field>
      <v-text-field
        class="userInput"
        label="Password"
        v-model="password"
        :rules="passwordRules"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        outlined
        required
        @click:append="show = !show"
        @keyup.enter="signUp()"
      ></v-text-field>
      <MessageRedirect link="/login" message="Already a member? Log in" />
      <SpacerExtraSmall />
    </v-form>
    <ButtonFormSubmit message='Sign Up' @submit="signUp()" />
  </div>
</template>

<script>
import ButtonFormSubmit from '~/components/ButtonFormSubmit'
import MessageError from '~/components/MessageError'
import MessageRedirect from '~/components/MessageRedirect'
import SpacerExtraSmall from '~/components/SpacerExtraSmall'

import axios from 'axios';
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
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    show: false,
    firstNameRules: [
      v => !!v || 'First name is required',
    ],
    lastNameRules: [
      v => !!v || 'Last name is required',
    ],
    emailRules: [
      v => !!v || 'Email is required',
    ],
    passwordRules: [
      v => !!v || 'password is required',
    ],
    errorMessage: 'Failed to Submit Form',
    error: false,
  }),
  methods:{
    signUp: function() {
      var self = this;
      self.error = false 
      self.errorMessage = ''
      axios.post(`${url}/signUp`, {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password,
        role: "CLIENT"
      })
      .then(function (response) {
        axios.post(`${url}/auth/login`, {
          email: self.email,
          password: self.password
        })
        .then(function (response){
          self.$store.commit('setUserData', response.data.user)
          self.$store.commit('logIn')
          window.location.assign('/dashboard')
        })
        .catch(function (error){
          //if the login request fails
          self.errorMessage = self.getErrorMessage(error)
          self.error = true
        })
      })
      .catch(function (error) {
        //if the signup request fails
          self.errorMessage = self.getErrorMessage(error)
          self.error = true
      }); 
    },
    getErrorMessage: function(error) { 
      //error is the response from the server
      //during an erroneous axios request
      let status = error.response.status
      let errorMessage = ''
      switch (status){
        case 400:
          errorMessage = 'An issue with your account role has been detected. Please contact us to get help with signing up.'
          break;

        case 404:
          errorMessage = 'Invalid email or password entered';
          break;

        case 406:
          errorMessage = "Improper email format. Please check that your email is in the form example@email.com"
          break;

        case 409:
          errorMessage = 'An account with that email already exists. Did you mean to login?'
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
