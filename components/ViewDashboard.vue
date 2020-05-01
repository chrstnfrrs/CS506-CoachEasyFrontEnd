<template>
  <div class="cardRow">
    <DashboardCard 
        v-for="i in cardList" :key="i"
        :type="i"
      />
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
    getUserData: function(){
      let self = this;
      Promise.all([ this.$store.state.userData ]).then( () => {
        self.user = this.$store.state.userData;
        self.getCurrentTemplate();
      },() => {
        self.loadingFailed = true
      })
    },
    getCurrentTemplate: function(){
      let self = this;
      axios.get(`${url}/client/template/active?user_id=${self.user.id}`)
      .then(result => {
        self.template = result.data;
        self.loading = false;
      }).catch(error => {
        self.error = true;
        console.log(error)
      });
    },
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