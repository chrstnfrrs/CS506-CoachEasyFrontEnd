<template>
  <div @click="emitFunction()" class="actionBtn">
    <p><strong>{{message}}</strong></p>

  </div>
</template>

<script>
export default {
  props:{
    message: String,
    active: Boolean,
  },
  methods: {
    emitFunction: function(){
      if (!this.active) {
        alert('hello'); // emit to FormCreate
      } else if( (this.message==="Create" && this.active)|| this.message==="Edit" || this.message==="Done" || this.message==="Save"){
        this.sendRequest();
      } else {
        this.setStatus();
      }
    },
    sendRequest: function(){
      this.$emit('sendRequest')
    },
    setStatus: function(){
      this.$emit('setStatus')
    }
  },
}
</script>

<style lang="scss">
// .disabled {
//   display: inline-flex;
//   overflow: hidden;
//   font-size: 14px;
//   text-decoration: none !important;
//   padding: 6px 10px;
//   background: grey;
//   border: 1px solid $text;
//   border-radius: 4px;
//   color: $background !important;
//   box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20);
//   cursor: mouse;
// }
</style>