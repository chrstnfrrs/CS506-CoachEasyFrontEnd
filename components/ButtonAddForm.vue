<template>
  <div class="actionBtn addForm" @click="addForm">
    <p ><strong>New {{type}}</strong></p>
  </div>
</template>

<script>
export default {
  props:{
    type: String
  },
  methods:{
    addForm: function(){
      if(this.type==='Exercise'){
        this.$emit('newExerciseForm')
      } else {
        this.$emit('newForm')
      }
    }
  }
}
</script>

<style lang='scss'>
.buttonAddForm{
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: $primary;
  color: $background;
  cursor: pointer;
  padding: 0;
  margin: auto;
  margin-left: 8px;
  // border: 1px solid $text;
  box-shadow: $elevation1;
}
.addForm{
  margin: 6px 10px;
  height: fit-content;
}
</style>