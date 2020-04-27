<template>
  <button
    class="actionBtn sessionButton"
    @click="doAction()">
      {{ action }}
  </button>
</template>

<script>
export default {
  props: {
    action: String
  },
  methods: {
    doAction: function() {
      if (this.action === 'Edit' || this.action === 'Done') {
        this.$emit('edit');
      } else if (this.action === 'Complete') {
        this.$emit('complete');
      }
    }
  }
}
</script>

<style lang="scss">
.sessionButton {
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;
}
</style>
