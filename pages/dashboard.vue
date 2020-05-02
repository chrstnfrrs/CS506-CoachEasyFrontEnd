<template>
  <div class="pageContent">
    <Loading v-if="loading" />
    <div v-if="!loading">
      <HeadingPage v-if="!loading" />
      <SpacerSmall />
      <div class="cardRow">
        <DashboardCard 
          v-for="i in cardList" :key="i"
          :type="i"
          :id="userID"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '~/components/Loading'
import HeadingPage from '~/components/HeadingPage'
import SpacerSmall from '~/components/SpacerSmall'
import DashboardCard from '~/components/DashboardCard'
export default {
  components: {
    Loading,
    HeadingPage,
    SpacerSmall,
    DashboardCard
  },
  data() {
    return {
      loading: true,
      userID: 1,
      loadingFailed: false,
      user: '',
      template: undefined,
      coachList: ["clients", "checkins", "template"],
      clientList: ["nextSession", "checkin", "trainingHistory", "trainingPlan"],
      cardList: [],
    }
  },
  methods: {
    getUserData: function(){
      let self = this;
      Promise.all([ this.$store.state.userData ]).then( () => {
        self.user = this.$store.state.userData;
        self.userID = self.user.id
        self.setList();
      },() => {
        self.loadingFailed = true
      })
    },
    setList: function() {
      console.log(this.user)
      if(this.user.role==='COACH'){
        this.cardList = this.coachList;
      } else {
        this.cardList = this.clientList;
      }
      this.loading = false;
    },
  },
  mounted(){
    this.getUserData();
  }
}
</script>

<style lang="scss">
  .cardRow{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
</style>
