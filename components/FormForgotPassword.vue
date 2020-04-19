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
          window.location.href = '/'
        })
        .catch(function (error){
          //if the forget password request fails
          self.error = true
        })
      } catch (error) {
        error = true
      }
    },
  },
}
</script>
