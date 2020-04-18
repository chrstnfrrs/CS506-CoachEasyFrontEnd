<template>
  <div>
    <div class="formCreateExercise">
      <v-text-field
        label="Category"
        v-model="categoryName"
        @input="canCreate"
      >
      </v-text-field>
      <v-text-field
        label="Exercise Name"
        v-model="exerciseName"
        @input="canCreate"
      >
      </v-text-field>
    </div>
    <div class="formCreateExercise">
    <button
        v-if="creatable"
        class="newExerciseBtn"
        @click="createNewExercise"
      >
        Create
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;
const url = 'https://coach-easy-deploy.herokuapp.com';

export default {
  data() {
    return {
      categoryName: '',
      exerciseName: '',
      creatable: false,
    }
  },
  methods: {
    canCreate: function() {
      this.creatable = !(this.categoryName === "" || this.exerciseName === "");
    },
    createNewExercise: function() {
      // post request here
      let returnedExercise = {};
      axios.post(`${url}/exercise`, {
        category: this.categoryName,
        name: this.exerciseName
      }).then(response => {
        console.log(response);
        returnedExercise = response.data.exercises[response.data.exercises.length - 1];
        this.$emit('newExerciseCreated', this.categoryName, returnedExercise);
      }).catch(error => {
        console.log(error);
      })
    }
  }
}
</script>

<style lang="scss">
  .newExerciseBtn {
    display: inline-flex;
    overflow: hidden;
    font-size: 14px;
    vertical-align: center;
    text-decoration: none !important;
    padding: 6px 10px;
    background: $primary;
    border: 1px solid $text;
    border-radius: 4px;
    color: $background !important;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20);
    cursor: pointer;
  }
</style>
