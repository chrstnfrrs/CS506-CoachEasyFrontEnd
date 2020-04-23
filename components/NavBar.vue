<template>
  <nav>
    <div class="navCol">
      <nuxt-link to="/" class="logo">Coach Easy</nuxt-link>
      <span class="navSpacer"></span>
      <nuxt-link v-if="loggedIn && role" to="/dashboard" class="navLink">Dashboard</nuxt-link>
    </div>
    <div v-if="!loggedIn" class="navCol">
      <nuxt-link to="/login" class="navLink">Log In</nuxt-link>
      <nuxt-link to="/signUp" class="navLink">Sign Up</nuxt-link>
    </div>
    <div v-if="loggedIn" class="navCol">
      <p class="userName"> {{getUserName}} </p>
      <span class="navSpacer"></span>
      <v-menu v-model="showMenu" absolute offset-y style="max-width: 40px">
        <template v-slot:activator="{ on }">
          <span class="navIcon" v-on="on"> <MdPersonIcon w="40px" h="40px"/> </span>
        </template>
        <v-list>
          <v-list-item class='navLink'>
            <nuxt-link class="navLink" to="/profile">View Profile</nuxt-link>
          </v-list-item>
         <v-list-item class="navLink">
          <span class="navLink" @click="logOut()">Log Out</span>
         </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;
const url = 'https://coach-easy-deploy.herokuapp.com';
import MdPersonIcon from 'vue-ionicons/dist/md-person.vue'

export default {
  components: {
    MdPersonIcon
  },
  data: () => ({
    showMenu: false,
    userName: '',
    error: false
  }),
  computed: {
    loggedIn: function(){
      return this.$store.state.loggedIn;
    },
    role: function(){
      if(this.$store.state.userData){
        return this.$store.state.userData.role;
      }
      return 'none'
    },
    getUserName: function(){
      if(this.$store.state.userData){
        return this.$store.state.userData.first_name;
      }
      return ''
    }
  },
  methods: {
    logOut: function() {
      var self = this
      axios.get(`${url}/auth/logout`)
      .then(function (response){
        self.$store.commit('logOut')
        self.error = false
        window.location.assign('/')
      })
      .catch(function (error){
        if(error.response.status===400){
          self.$store.commit('logOut')
          self.error = true
        } else {
          self.error = true
        }
      })
    },
  },
}
</script>

<style lang="scss">
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    padding: 16px;
    background: $background-secondary;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20);
    z-index: 100;
    overflow: hidden;
    .navCol{
      display: flex;
      align-items: center;
    }
    .navLink{
      color: $text !important;
      padding-left: 8px;
      cursor: pointer;
    }
    .navSpacer{
      width: 16px;
    }
    .navIcon{
      fill: $text;
      cursor: pointer;
    }
    .userName{
      cursor: default;
    }
  }
</style>
