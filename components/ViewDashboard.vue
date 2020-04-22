<template>
  <div class="cardRow">
    <div class="cardCol" v-for="i in cardList" :key="i">
      <DashboardCard 
        :type="i"
      />
    </div>
  </div>
</template>

<script>
import DashboardCard from '~/components/DashboardCard'
export default {
  components: {
    DashboardCard
  },
  props:{
    type: String,
  },
  data() {
    return {
      coachList: ["clients", "template"],
      clientList: ["nextSession", "trainingPlan", "trainingHistory"],
      cardList: [],
    }
  },
  methods: {
    setList: function() {
      if(this.type==='COACH'){
        this.cardList = this.coachList;
      } else {
        this.cardList = this.clientList;
      }
    },
  },
  mounted() {
    this.setList()
  },
}
</script>

<style lang="scss">
  .cardRow{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    justify-items: center;
  }
  .cardCol {
    width: calc(100% - 20px) !important;
    margin: 10px !important;
  }
</style>