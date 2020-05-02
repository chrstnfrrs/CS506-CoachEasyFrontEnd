<template>
  <div>
    <button
      class="actionBtn sessionButton"
      @click="doAction()">
        {{ action }}
    </button>
    <span v-if="confirmComplete" class="errorText">Complete session without entering weight and/or a comment? Press complete to confirm.</span>
  </div>
</template>

<script>
export default {
  props: {
    action: String,
    session: Object,
  },
  data() {
    return{
      confirmComplete: false,
    }
  },
  methods: {
    doAction: function() {
      if (!(this.$props.session.comment &&  this.$props.session.client_weight)) {
        if(!this.confirmComplete) {
         this.confirmComplete = true;
        } else {
          if (this.action === 'Complete') {
            console.log('button view session emitting 1');
            this.$emit('complete');
          }
        }
      } else {
        if (this.action === 'Complete') {
            console.log('button view session emitting 2');
            this.$emit('complete');
        }
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
.errorText{
  color: red;
}
</style>
