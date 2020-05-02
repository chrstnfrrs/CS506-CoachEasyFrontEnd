<template>
  <div class="dashCardContainer">
    <CardClients v-if="type==='clients'" :cardType="type" />
    <CardTemplate v-if="type==='template'" :cardType="type" />
    <CardNextSession v-if="type==='nextSession'" :cardType="type" />
    <CardCheckin v-if="type==='checkin'" :cardType="type" />
    <CardCheckins v-if="type==='checkins'" :cardType="type" />
    <CardCurrentPlan v-if="type==='trainingPlan'" :cardType="type" :id="this.id"/>
    <CardTrainingHistory v-if="type==='trainingHistory'" :cardType="type" />
  </div>
</template>

<script>
import CardClients from '~/components/CardClients'
import CardTemplate from '~/components/CardTemplate'
import CardNextSession from '~/components/CardNextSession'
import CardCheckin from '~/components/CardCheckin'
import CardCurrentPlan from '~/components/CardCurrentPlan'
import CardTrainingHistory from '~/components/CardTrainingHistory'
import CardCheckins from '~/components/CardCheckins'
export default {
  props:{
    type: String,
    id: Number
  },
  components:{
    CardClients,
    CardTemplate,
    CardNextSession,
    CardCheckin,
    CardCurrentPlan,
    CardTrainingHistory,
    CardCheckins
  }
}
</script>

<style lang="scss">
.dashCardContainer{
  width: calc(100% - 20px) !important;
  margin: 10px !important;
}
  .dashCard{
    
    display: flex !important;
    width: 100%;
    height: 250px;
    align-items: center;
    justify-content: center;
    background: $background-secondary !important;
    border-radius: 10px !important;
    text-decoration: none !important;
    color: $text !important;
    box-shadow: $elevation1 !important;
  }
  .dashCard:hover{
    box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.20);
    .dashContents{
      .subHeading{
        color: $primary !important;
      }
    }
    .ion__svg{
      padding-top: 7px;
      path{
        fill: $primary;
      }
    }
  }
</style>
