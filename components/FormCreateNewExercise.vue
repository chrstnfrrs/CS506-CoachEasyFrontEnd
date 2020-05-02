<template>
  <div>
    <MessageError v-if="error" :message="errorMessage" />
    <div class="formCreateExercise">
      <v-text-field
        class="listExercises listCategories"
        label="Category"
        v-model="categoryName"
        @input="canCreate"
      >
      </v-text-field>
      <v-text-field
        class="listExercises"
        label="Exercise Name"
        v-model="exerciseName"
        @input="canCreate"
      >
      </v-text-field>
      <button
        class="actionBtn addForm"
        @click="returnToSelect"
      >
        Back
      </button>
      <button
        v-if="creatable"
        class="actionBtn addForm"
        @click="createNewExercise"
      >
        Create
      </button>
    </div>
    <!-- TODO: add back button -->
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
const url = "https://coach-easy-deploy.herokuapp.com";

import MessageError from '~/components/MessageError'
export default {
  components: {
    MessageError
  },
  data() {
    return {
      categoryName: "",
      exerciseName: "",
      creatable: false,
      error: false,
      errorMessage: ''
    };
  },
  methods: {
    canCreate: function() {
      this.creatable = !(this.categoryName === "" || this.exerciseName === "");
    },
    createNewExercise: function() {
      // post request here
      let returnedExercise = {};
      axios
        .post(`${url}/exercise`, {
          category: this.categoryName,
          name: this.exerciseName
        })
        .then(response => {
          console.log(response);
          returnedExercise = response.data.exercises.find(
            ex => ex.name === this.exerciseName
          );
          this.$emit("newExerciseCreated", this.categoryName, returnedExercise);
        })
        .catch(error => {
          console.log(error);
          this.error = true;
          this.error = 'Failed to create new exercise.'
        });
    },
    returnToSelect: function() {
      this.$emit('return');
    }
  }
};
</script>

<style lang="scss">
.newExerciseBtn {
  display: inline-flex;
  overflow: hidden;
  font-size: 14px;
  height: 35px;
  margin: 5px;
  -ms-transform: translateY(30%);
  transform: translateY(30%);
  top: 50%;
  text-decoration: none !important;
  padding: 6px 10px;
  background: $primary;
  border: 1px solid $text;
  border-radius: 4px;
  color: $background !important;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.listCategories {
  max-width: 200px;
}
.listExercises {
  flex: 1;
  min-width: 150px;
  margin-right: 12px;
}
</style>
