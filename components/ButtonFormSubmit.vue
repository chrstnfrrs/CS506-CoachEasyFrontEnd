<template>
  <div class="submitBtn" @click="submitForm">
    <p class="submitBtnText">{{message}}</p>
  </div>
</template>

<script>
export default {
  props:{
    message: String,
  },
  methods:{
    submitForm: function() {
      this.$emit('submit')
      // if (this.type === 'login'){
      //   this.$emit('login')
      // } 
      // else if (this.type === 'signUp') {
      //   this.$emit('signUp')
      // }
      // else if (this.type === 'changePassword'){
      //   this.$emit('changePassword')
      // }
      // else if (this.type === 'editProfile'){
      //   this.$emit('editProfile')
      // }
      // else if (this.type === 'editTemplate'){
      //   this.$emit('editTemplate')
      // }
      // else if (this.type === 'forgotPassword'){
      //   this.$emit('forgotPassword')
      // }
      // else if (this.type === 'resetPassword'){
      //   this.$emit('resetPassword')
      // }
      // else {
      //   console.log(type)
      // }
    }
  }
}
</script>