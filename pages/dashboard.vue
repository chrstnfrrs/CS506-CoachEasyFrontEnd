<template>
  <div class="pageContent">
    <Loading v-if="loading" />
    <HeadingPage v-if="!loading" />
    <ViewDashboard v-if="!loading" :type="this.role"/>
  </div>
</template>

<script>
import Loading from '~/components/Loading'
import HeadingPage from '~/components/HeadingPage'
import ViewDashboard from '~/components/ViewDashboard'
export default {
  components: {
    Loading,
    HeadingPage,
    ViewDashboard
  },
  data() {
    return {
      loading: true,
      role: '',
      loadingFailed: false
    }
  },
  mounted(){
    Promise.all([ this.$store.state.userData ]).then( () => {
      this.role = this.$store.state.userData.role
      this.loading = false
    },() => {
      this.loadingFailed = true
    })
  }
}
</script>
