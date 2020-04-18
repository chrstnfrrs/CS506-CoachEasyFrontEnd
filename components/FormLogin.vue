<template>
  <div>
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
    <MessageError v-if="error" :message="errorMessage" />
    <button
      @click='loginSubmit'
      class="submitBtn"
    >
      <MessageButton message='Log In'/>
    </button>
  </div>
</template>

<script>
import MessageButton from '~/components/MessageButton'
import MessageError from '~/components/MessageError'
import MessageRedirect from '~/components/MessageRedirect'
import SpacerExtraSmall from '~/components/SpacerExtraSmall'

import axios from 'axios'
axios.defaults.withCredentials = true;
const url = 'https://coach-easy-deploy.herokuapp.com';

export default {
  components: {
    MessageButton,
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
        self.error = false
        self.errorMessage = ''
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
            // on login promise failure
            self.error = true
          })
      } catch (error){
        self.error = true
      }
    },
  },
}
</script>
