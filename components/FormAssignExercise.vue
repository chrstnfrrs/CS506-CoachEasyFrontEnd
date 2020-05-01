<template>
  <div class="embeddedForm">
    <div v-if="!shouldCreateNew" class="formCreateExercise" >
      <!-- Maybe move these v-selects to an ExerciseSelector componenet -->
      <v-select
        class="listExercises listCategories"
        :items="categoryList"
        label="Choose Category"
        v-model="selectedCategory"
        @change="filterExerciseList"
        hide-selected
      >
      </v-select>
      <v-select
        class="listExercises"
        :items="filteredExerciseList"
        v-model="selectedExercise"
        item-text="name"
        label="Choose Exercise"
        return-object
        @change="updateExercise"
        hide-selected
      >
      </v-select>
      <button
        v-if="!createdNewExercise"
        class="actionBtn addForm"
        @click="isCreatingNewExercise"
      >
        New
      </button>
      <v-text-field
        v-if="setsAndReps"
        label="Sets"
        v-model="sets"
        type="number"
        class="formCreateItem smallItem"
        :rules="setRules"
        @input="updateExercise">
      </v-text-field>
      <v-text-field 
        v-if="setsAndReps"
        label="Reps"
        v-model="reps"
        type="number"
        :rules="repRules"
        class="formCreateItem smallItem"
        @input="updateExercise">
      </v-text-field>
      <v-text-field 
        v-if="setsAndReps"
        label="Weight"
        v-model="weight"
        type="number"
        :rules="repRules"
        class="formCreateItem smallItem"
        @input="updateExercise">
      </v-text-field>
    </div>
    <!-- <div v-if="shouldCreateNew" >
      <FormCreateNewExercise @return="notCreatingNew()" @newExerciseCreated="isCreatingNewExercise" />
    </div> -->
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;
const url = 'https://coach-easy-deploy.herokuapp.com';

import FormCreateNewExercise from '~/components/FormCreateNewExercise'
export default {
  components: {
    FormCreateNewExercise,
  },
  props: {
    session: Object,
    allContent: Boolean
  },
  data() {
    return {
      selectedCategory: '',
      setsAndReps: this.allContent,
      exerciseName: "",
      selectedExercise: {},
      exercise: {
        exercise_id: 0,
        sets: 0,
        reps: 0,
        weight: 0,
      },
      index: 0,
      creating: true,
      filteredExerciseList: [],
      exerciseList: [],
      categoryList: [],
      shouldCreateNew: false,
      createdNewExercise: false,
      reps: 0,
      sets: 0,
      weight: 0,
      updating: false,
      coachExerciseId: 0,
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
    // creates new exercise and adds it the the template
    createExercise: function() {
      this.exercise = {
        id: this.coachExerciseId,
        exercise_id: this.selectedExercise.id,
        sets: this.sets,
        reps: this.reps,
        weight: this.weight,
      }
      this.$props.session.exercises[this.index] = this.exercise;
      this.creating = false;
    },
    // updates exercise on input
    updateExercise: function() {
      this.updating = true;
      if (this.creating) {
        this.createExercise();
      } else { 
        this.$props.session.exercises[this.index].exercise_id = this.selectedExercise.id;
        this.$props.session.exercises[this.index].reps = this.reps;
        this.$props.session.exercises[this.index].sets = this.sets;        
        this.$props.session.exercises[this.index].weight = this.weight;
      }
    },
    // retrives exercises from db
    getExercises: function() {
      axios.get(`${url}/exercises`).then(result => {
        this.exerciseList = result.data.exercises;
        this.getCategories();
        if (this.setsAndReps) {
          this.fillFields();
        }
      }).catch(error => {
        this.error = true;
        console.log(error)
      });
    },
    // gets individual categories from list of exercises
    getCategories: function() {
      this.exerciseList.forEach(exercise => {
        if (!this.categoryList.includes(exercise.category)) {
          this.categoryList.push(exercise.category);
        }
      });
      this.filterExerciseList();
    },
    // filters exercises according to the selected category
    filterExerciseList: function() {
      this.filteredExerciseList = this.exerciseList.filter(exercise => exercise.category === this.selectedCategory);
    },
    // determines if coach is manually creating a new exercise
    // calls createNewExercise if so
    isCreatingNewExercise: function(category='', exercise={}) {
      if (this.shouldCreateNew) {
        this.createNewExercise(category, exercise);
      }
      this.shouldCreateNew = !this.shouldCreateNew;
    },
    // sets the selected category/exercise to the newly created fields
    createNewExercise: function(category, exercise) {
      this.getExercises();
      this.selectedCategory = category;
      this.selectedExercise = exercise;
      // checks if user already selected a created exercise but then decides to manually enter a new one
      if (!this.creating) {
        this.$props.session.exercises[this.index].exercise_id = this.selectedExercise.id;
      } else {
        this.createExercise();
      }
      this.createdNewExercise = true;
    },
    notCreatingNew: function() {
      this.shouldCreateNew = false;
    },
    fillFields: function() {

      let exerciseId = this.$vnode.key;
      this.index = this.findExerciseIndexInSession(this.$props.session.exercises, exerciseId);
      if (this.index == -1) {
        this.index = this.findExerciseIndex(this.$props.session.exercises, exerciseId);
      }
      if (this.index == -1) {
        this.index = this.$props.session.exercises.length - 1;
      }
      if (this.index > -1) {
        let selectedExerciseIndex = this.findExerciseIndex(this.exerciseList, exerciseId);
        this.selectedCategory = this.exerciseList[selectedExerciseIndex].category;
        this.filterExerciseList();
        this.selectedExercise = this.exerciseList[selectedExerciseIndex];

      if (this.coachExerciseId == 0) {
        this.coachExerciseId = this.$props.session.exercises[this.index].id;
      }
      console.log(`coachExerciseId: ${this.coachExerciseId}`);
        this.exercise = {
          id: this.coachExerciseId,
          exercise_id: exerciseId,
          sets: this.sets,
          reps: this.reps,
          weight: this.weight,
        };
        this.$props.session.exercises[this.index] = this.exercise;
        this.creating = false;
      }
    },
    findExerciseIndex: function(arr, value) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === value) {
          return i;
        }
      }
      return -1;
    },
    findExerciseIndexInSession: function(arr, value) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].exercise_id === value) {
          return i;
        }
      }
      return -1;
    }
  },
  mounted() {
    this.getExercises();
  },
}
</script>

<style lang="scss">
.formCreateExercise{
  display: flex;
  min-width: 100px;
  align-items: center;
}
.formCreateItem{
  flex: 1;
}
.smallItem{
  max-width: 50px;
  min-width: 30px;
  margin-left:12px;
}
.newExerciseBtn{
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
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20);
  cursor: pointer;
}
.listCategories{
  max-width: 200px;
}
.listExercises{
  flex: 1;
  min-width: 150px;
  margin-right: 12px;
}
</style>