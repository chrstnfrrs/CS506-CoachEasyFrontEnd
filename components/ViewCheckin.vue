<template>
  <div>
    <div 
    v-if="(checkin.check_in.front !== null) ||
    (checkin.check_in.back !== null) ||
    (checkin.check_in.side_a !== null)||
    (checkin.check_in.side_b !== null)">
    <HeadingSection text="Check In Images"/>
    <SpacerSmall />
      <div class="fileContainer">
        <v-img v-if="checkin.check_in.front !== null" :src="checkin.check_in.front" aspect-ratio="1"></v-img>
        <v-img v-if="checkin.check_in.back !== null" :src="checkin.check_in.back" aspect-ratio="1"></v-img>
        <v-img v-if="checkin.check_in.side_a !== null" :src="checkin.check_in.side_a" aspect-ratio="1"></v-img>
        <v-img v-if="checkin.check_in.side_b !== null" :src="checkin.check_in.side_b" aspect-ratio="1"></v-img>
      </div>
    </div>
    <div class="secondaryDisplay flexColumn">
      <div v-if="checkin.check_in.coach_comment!=null">
        <strong>Coaches Comment</strong>
        <p>{{checkin.check_in.coach_comment}}</p>
      </div>
      <div v-if="checkin.check_in.client_comment!=null">
        <strong>Client Comment</strong>
        <p>{{checkin.check_in.client_comment}}</p>
      </div>
    </div>
    <ViewSession v-for="session in checkin.sessions" :key="session.id" :session="session" :role="role" />
  </div>
</template>

<script>
import HeadingSection from '~/components/HeadingSection'
import ViewSession from '~/components/ViewSession'
import SpacerSmall from '~/components/SpacerSmall'
export default {
  components:{
    HeadingSection,
    ViewSession,
    SpacerSmall
  },
  props: {
    checkin: Object,
    role: String,
  }
}
</script>

<style>
  .fileContainer{
    width: 100%;
    display: grid;
    grid-gap: 32px;
    grid-template-columns: repeat(auto-fill, minmax(304px, 1fr));
  }
</style>