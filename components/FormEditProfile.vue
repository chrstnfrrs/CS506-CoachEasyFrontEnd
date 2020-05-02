<template>
  <div>
    <MessageSuccess v-if="success" :message="successMessage"/>
    <MessageError :error="error" :message="errorMessage" />
    <SpacerSmall v-if="submitted" />
    <v-text-field
      label="First Name"
      :placeholder="user.first_name"
      v-model="firstName"
      outlined
    ></v-text-field>
    <v-text-field
      label="Last Name"
      :placeholder="user.last_name"
      v-model="lastName"
      outlined
    ></v-text-field>
    <v-text-field
      label="Email"
      :placeholder="user.email"
      v-model="email"
      outlined
    ></v-text-field>
    <ButtonFormSubmit message='Save' @submit="editProfile()" />
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;
const url = 'https://coach-easy-deploy.herokuapp.com';

import ButtonFormSubmit from '~/components/ButtonFormSubmit'
import Loading from '~/components/Loading'
import MessageSuccess from '~/components/MessageSuccess'
import MessageError from '~/components/MessageError'
import SpacerSmall from '~/components/SpacerSmall'

export default {
  components:{
    ButtonFormSubmit,
    Loading,
    MessageSuccess,
    MessageError,
    SpacerSmall
  },
  props: {
    user: Object
  },
  data() {
    return {
      user: this.user,
      firstName: '',
      lastName: '',
      email: '',
      submitted: false,
      success: false,
      successMessage: 'Updated Profile!',
      error: false,
      errorMessage: 'Form Failed to Submit.',

    }
  },
  methods: {
    resetVariables: function(){
      self.submitted = false;
      self.success = false;
      self.error = false;
    },
    editProfile: function(){
      var self = this;
      this.resetVariables();
      let fn = this.firstName!=='' ? this.firstName : this.user.first_name;
      let ln = this.lastName!=='' ? this.lastName : this.user.last_name;
      let em = this.email!=='' ? this.email : this.user.email;
      axios.put(`${url}/updateProfile`, {
        email: em,
        first_name: fn,
        last_name: ln
      })
      .then(function (response) {
        self.user = response.data.user
        self.$store.commit('setUserData', response.data.user);
        self.submitted = true;
        self.success = true;
        self.$store.commit('editStatus');
      })
      .catch(function (error) {
        self.submitted = true;
        self.error = true;
      });
    }
  },
}
</script>
