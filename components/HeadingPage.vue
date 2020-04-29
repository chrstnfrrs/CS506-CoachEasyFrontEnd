<template>
  <div class="headingContainer">
    <h1 class="headingPage" v-if="this.name">{{this.name}}</h1>
    <h1 class="headingPage" v-if="!this.name">{{this.$router.currentRoute.name}}</h1>
    <div v-if="this.role==='COACH'">
      <ButtonHeading @sendRequest="save()" v-if="this.status==='Edit' || this.status==='Done' || this.status==='Save' || this.status==='Assign'" active :message="this.status"/>
      <ButtonHeading @sendRequest="save()" v-if="this.status==='Create'" :active="active" :message="this.status"/>
      <ButtonHeading @setStatus="updateStatus()" v-if="hasButton() && this.message" active :message="this.message"/>
    </div>
    <div v-else>
        <ButtonHeading @setStatus="updateStatus()" v-if="this.status==='Start' || this.status==='Cancel'" active :message="this.status"/>
    </div>
  </div>
</template>

<script>
import ButtonHeading from '~/components/ButtonHeading'
export default {
  props:{
    name: String,
    message: String,
    status: String,
    active: Boolean
  },
  components: {
    ButtonHeading
  },
  data() {
    return {
      role: '',
      buttonPages: ['template', 'template-id'],
    }
  },
  methods:{
    save: function(){
      this.$emit('sendRequest')
    },
    updateStatus: function(){
      this.$emit('updateStatus')
    },
    hasButton: function(){
      let route = this.$router.currentRoute.name;
      console.log(`route: ${route}`);
      if(this.buttonPages.includes(route) && this.role==='COACH'){
        return true;
      } else {
        return false;
      }
    },
  },
  mounted(){
    Promise.all([ this.$store.state.userData ]).then( () => {
      this.role = this.$store.state.userData.role
    },() => {
    })
  }
}
</script>

<style lang="scss">
  .headingContainer{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .headingPage{
    text-transform: capitalize;
    margin-right: 16px;
  }
</style>