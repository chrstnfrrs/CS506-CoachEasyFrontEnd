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
      if (this.action === 'Complete') {
        this.$emit('complete');
      }
    }
  }
}
</script>

<style lang="scss">
.sessionButton {
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  font-weight: 500;
}
</style>
