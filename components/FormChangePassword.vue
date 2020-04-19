<template>
<div>
    <MessageError v-if="error" :message="errorMessage" />
    <v-text-field
      label="Old Password"
      v-model="oldPassword"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      @click:append="show1 = !show1"
      outlined
    ></v-text-field>
    <v-text-field
      label="New Password"
      v-model="newPassword"
      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show2 ? 'text' : 'password'"
      @click:append="show2 = !show2"
      outlined
    ></v-text-field>
    <v-text-field
      label="Confirm Password"
      v-model="confirmPassword"
      :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show3 ? 'text' : 'password'"
      @click:append="show3 = !show3"
      outlined
    ></v-text-field>
    <ButtonFormSubmit message='Save' @submit="changePassword()" />
</div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;
const url = 'https://coach-easy-deploy.herokuapp.com';

import ButtonFormSubmit from '~/components/ButtonFormSubmit'
import MessageError from '~/components/MessageError'

export default {
  components:{
    ButtonFormSubmit,
    MessageError
  },
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      error: false,
      errorMessage: "Failed to Submit Form",
      show1: false,
      show2: false,
      show3: false
    }
  },
  methods: {
    changePassword: function(){
      if(this.newPassword === this.confirmPassword && this.newPassword!==''){
        this.error = false;
        let em = this.$store.state.userData.email;
        const self = this;
        axios.put(`${url}/updateProfile`, {
          email: em,
          newPassword: this.newPassword,
          oldPassword: this.oldPassword
        })
        .then(function (response) {
          window.location.href = '/profile'
        })
        .catch(function (error) {
          //axios promise failed
          self.error = true;
        });
      } else {
        this.error = true;
        errorMessage = 'New password and password confirmation do not match'
      }
    }
  },
}
</script>