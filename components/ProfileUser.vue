<template>
  <div>
    <div class="profileHeading">
      <h1 v-if="!coach">{{getHeading()}} Client</h1>
    </div>
    <h3>Name</h3>
    <p>{{user.first_name}} {{user.last_name}}</p>
    <h3>Email</h3>
    <p>{{user.email}}</p>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    coach: Boolean,
  },
  methods: {
    getHeading: function(){
      if(this.user.approved){
        return 'Approved'
      } else if(this.user.approved===false) {
        return 'Potential'
      } else if(this.user.approved===null) {
        return 'Terminated'
      } else {
        return '';
      }
    }
  },
}
</script>

<style lang="scss">
  .profileHeading{
    display: flex;
    justify-content: flex-start;
  }
</style>