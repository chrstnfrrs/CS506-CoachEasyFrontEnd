<template>
  <div>
    <form>
      <h2>Check In Photos</h2>
      <SpacerExtraSmall />
      <div class="fileContainer">
        <v-file-input
        filled
        solo
        label="Front"></v-file-input>
        <v-file-input
        filled
        solo
        label="Back"></v-file-input>
        <v-file-input
        filled
        solo
        label="SideA"></v-file-input>
        <v-file-input
        filled
        solo
        label="SideB"></v-file-input>
      </div>
      <SpacerSmall />
      <v-text-field
        label="Check In Comment">
      </v-text-field>
      <SpacerSmall />
      <FormCompleteSession v-for="session in checkin.sessions" :key="session.id" :session="session"/>
      <ButtonViewSession @complete="completeSession()" :session="this.session" action="Complete" />
    </form>
  </div>
</template>

<script>
import SpacerExtraSmall from '~/components/SpacerExtraSmall'
import FormCompleteSession from '~/components/FormCompleteSession'
import ButtonViewSession from '~/components/ButtonViewSession'
import SpacerSmall from '~/components/SpacerSmall'
export default {
  props:{
    checkin: Object
  },
  components:{
    SpacerExtraSmall,
    FormCompleteSession,
    ButtonViewSession,
    SpacerSmall
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
</style>