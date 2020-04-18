<template>
  <div class="pageContent">
    <Loading v-if="loading" />
    <div v-if="!loading">
      <HeadingProfile :name="this.user.first_name"/>
      <SpacerSmall />
      <ProfileUser 
        v-if="!error 
          && !edit" 
        :user="this.user" 
        :coach="this.user.role==='COACH'" />
      <FormEditProfile
        v-if="edit"
        :user="this.user" />
      <SpacerSmall />
    </div>
    <MessageRedirect link='/changePassword' message='Change Password?' />
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;
const url = 'https://coach-easy-deploy.herokuapp.com';

import HeadingProfile from '~/components/HeadingProfile'
import ProfileUser from '~/components/ProfileUser'
import FormEditProfile from '~/components/FormEditProfile'
import SpacerSmall from '~/components/SpacerSmall'
import Loading from '~/components/Loading'

export default {
  components: {
    HeadingProfile,
    ProfileUser,
    FormEditProfile,
    SpacerSmall,
    Loading,
  },
  data() {
    return {
      user: {},
      error: false,
      loading: true,
      loadingFailed: false,
    }
  },
  methods: {
    getUser: function(){
      Promise.all([ this.$store.state.userData ]).then( () => {
        this.user = this.$store.state.userData
        this.loading = false
      },() => {
        this.loadingFailed = true
      })
    }
  },
  computed: {
    edit: function() {
      return this.$store.state.edit;
    }
  },
  created() {
    this.getUser();
  },
}
</script>

<style lang="scss">

</style>
