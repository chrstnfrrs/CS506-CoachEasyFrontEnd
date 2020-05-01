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
import ViewDashboard from '~/components/ViewDashboard'
import DashboardCard from '~/components/DashboardCard'
export default {
  components: {
    Loading,
    HeadingPage,
    SpacerSmall,
    ViewDashboard,
    DashboardCard
  },
  data() {
    return {
      loading: true,
      userID: 1,
      loadingFailed: false,
      user: '',
      template: undefined,
      coachList: ["clients", "template"],
      clientList: ["nextSession", "checkin", "trainingPlan", "trainingHistory"],
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
