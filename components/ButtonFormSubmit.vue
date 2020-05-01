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
    }
  }
}
</script>