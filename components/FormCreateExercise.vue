<template>
  <div class="formCreateExercise" >
    <v-select
      :items="exerciseList"
      v-model="selectedExercise"
      item-text="name"
      label="Choose Exercise"
      class="formCreateItem"
      return-object
      @change="updateExercise"
    >
    </v-select>
    <v-text-field
      v-if="setsAndReps"
      label="Sets"
      v-model="exercise.sets"
      type="number"
      class="formCreateItem smallItem"
      :rules="setRules"
      ></v-text-field>
    <v-text-field 
      v-if="setsAndReps"
      label="Reps"
      v-model="exercise.reps"
      type="number"
      :rules="repRules"
      class="formCreateItem smallItem"
      ></v-text-field>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;
const url = 'https://coach-easy-deploy.herokuapp.com';

export default {
  components: {
  },
  props: {
    session: Object,
    allContent: Boolean
  },
  data() {
    return {
      setsAndReps: this.allContent,
      exerciseName: "",
      selectedExercise: {},
      exercise: {},
      index: 0,
      creating: true,
      exerciseList: [],
      setRules: [
        value => value >= 0 || 'sets cannot be negative',
      ],
      repRules: [
        value => value >= 0 || 'reps cannot be negative',
      ],
      weightRules: [
        value => value >= 0 || 'Weight cannot be negative',
      ],
    }
  },
  methods: {
    createExercise: function() {
        this.order = this.$props.session.coach_exercises.length + 1;
        this.exercise = {
          exercise_id: this.selectedExercise.id,
          order: this.order,
        }
        this.$props.session.coach_exercises.push(this.exercise);
        this.index = this.$props.session.coach_exercises.length - 1;
        this.creating = false;
    },
    updateExercise: function() {
      if (this.creating) {
        this.createExercise();
      } else {
        this.$props.session.coach_exercises[this.index].exercise_id = this.selectedExercise.id;
      }
    },
    getExercises: function() {
      axios.get(`${url}/exercises`).then(result => {
        this.exerciseList = result.data.exercises;
        console.log(this.exerciseList);
      }).catch(error => {
        this.error = true;
        console.log(error)
      });
    }
  },
  mounted() {
    this.getExercises();
  }
}
</script>

<style lang="scss">
.formCreateExercise{
  display: flex;
  min-width: 100px;
}
.formCreateItem{
  flex: 1;
}
.smallItem{
  max-width: 50px;
  min-width: 30px;
  margin-left:12px;
}
</style>