<template>
  <div>
    <form>
      <h2>Check In Photos</h2>
      <SpacerExtraSmall />
        <div class="formContainer">
            <v-file-input
              v-model="front"
              filled
              solo
              label="Front">
            </v-file-input>
            <v-img v-if="checkin.check_in.front !== null" :src="checkin.check_in.front" aspect-ratio="1"></v-img>
            <v-file-input
              v-model="back"
              filled
              solo
              label="Back">
            </v-file-input>
            <v-img v-if="checkin.check_in.back !== null" :src="checkin.check_in.back" aspect-ratio="1"></v-img>
            <v-file-input
              v-model="sidea"
              filled
              solo
              label="SideA"></v-file-input>
            <v-img v-if="checkin.check_in.side_a !== null" :src="checkin.check_in.side_a" aspect-ratio="1"></v-img>
            <v-file-input
              v-model="sideb"
              filled
              solo
              label="SideB"></v-file-input>
            <v-img v-if="checkin.check_in.side_b !== null" :src="checkin.check_in.side_b" aspect-ratio="1"></v-img>
      </div>
      <SpacerSmall />
      <v-text-field
        label="Check In Comment">
      </v-text-field>
      <SpacerSmall />
      <FormCompleteSession v-for="session in checkin.sessions" :key="session.id" :session="session"/>
      <ButtonFormSubmit class="submitCheckinBtn" message='Submit' @submit="completeCheckin()" />
      <!-- <ButtonViewSession @complete="completeCheckin()" :session="this.session" action="Complete" /> -->
    </form>
  </div>
</template>

<script>
import SpacerExtraSmall from '~/components/SpacerExtraSmall'
import ButtonFormSubmit from '~/components/ButtonFormSubmit'
import FormCompleteSession from '~/components/FormCompleteSession'
import ButtonViewSession from '~/components/ButtonViewSession'
import SpacerSmall from '~/components/SpacerSmall'
import axios from 'axios'
import FormData from 'form-data'
const url = 'https://coach-easy-deploy.herokuapp.com';
axios.defaults.withCredentials = true;

export default {
  props:{
    checkin: Object
  },
  components:{
    SpacerExtraSmall,
    FormCompleteSession,
    ButtonViewSession,
    SpacerSmall,
    ButtonFormSubmit
  },
  methods: {
    completeCheckin: function() {
      let formData = new FormData()
      if (this.front !== null) {
        formData.append('front', this.front, this.front.name)
      }
      if (this.back !== null) {
        formData.append('back', this.back, this.back.name)
      }
      if (this.sidea !== null) {
        formData.append('side_a', this.sidea, this.sidea.name)
      }
      if (this.sideb !== null) {
        formData.append('side_b', this.sideb, this.sideb.name)
      }
      formData.append('body', JSON.stringify({
        'check_in': this.checkin.check_in,
        'sessions': this.checkin.sessions
      }))

      axios.put(`${url}/submitCheckin`, formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then(result => {
        window.location.href="/checkin"
      }).catch(error => {
        console.log(error)
      })
    }
  },
  data() {
    return {
      front: null,
      back: null,
      sidea: null,
      sideb: null
    }
  }
}
</script>

<style lang="scss">
  .fileContainer{
    width: 100%;
    display: grid;
    grid-gap: 32px;
    grid-template-columns: repeat(auto-fill, minmax(304px, 1fr));
  }
  .submitCheckinBtn{
    width: 100%;
  }
</style>
