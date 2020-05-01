<template>
  <div class="formContainer">
    <div class="formCreateHeading">
      <v-text-field
        :class="{ 'custom-place-holder': !creatable }"
        label="Session Name"
        v-model="sessionName"
        @input="updateSession"
        :placeholder="placeHolderText"
        required>   
      </v-text-field>
      <p v-if="deleteStatus" class="buttonDelete errorBackground"><v-icon dark>mdi-delete</v-icon></p>
      <ButtonAddForm @newExerciseForm="addExcerciseForm()" type="Exercise" v-if="exerciseCount===0 && sessionName.length > 0 && !setsAndReps"/>
    </div>
    <div v-if="!creating">
      <FormCreateExercise  v-if="!setsAndReps" v-for="exercise in session.coach_exercises" :key="exercise.id" :session="session" :allContent="setsAndReps"/>
      <FormAssignExercise  v-if="setsAndReps" v-for="exercise in session.exercises" :key="getExerciseId(exercise)" :session="session" :allContent="setsAndReps"/>
    </div>
    <ButtonAddForm @newExerciseForm="addExcerciseForm()" type="Exercise" v-if="exerciseCount!==0 && !setsAndReps"/>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;
const url = 'https://coach-easy-deploy.herokuapp.com';

import ButtonAddForm from '~/components/ButtonAddForm'
import FormCreateExercise from '~/components/FormCreateExercise'
import FormAssignExercise from '~/components/FormAssignExercise'
export default {
  components:{
    ButtonAddForm,
    FormCreateExercise,
    FormAssignExercise
  },
  props: {
    template: Object,
    setsAndReps: Boolean
  },
  data() {
    return {
      exerciseCount: 0,
      session: {},
      sessionName: '',
      index: 0,
      order: 0,
      creating: true,
      deleteStatus: false,
      creatable: true,
      placeHolderText: "Name",
    }
  },
  methods: {
    addForm: function(){
      this.$emit('newForm');
      this.creating = true;
    },
    addExcerciseForm: function(){
      this.exerciseCount++;
      if (!this.setsAndReps) {
        this.session.coach_exercises.push({});
      } else {
        console.log(this.session);
        this.session.exercises.push({});
      }
    },
    createSession: function() {
      if (!this.setsAndReps) {
        this.session = {
          name: this.sessionName,
          order: this.$props.template.sessions.length,
          coach_exercises: [],
        } 
      } else {
        this.session = {
          name: this.sessionName,
          exercises: [],
        }
      }
        
        this.index = this.$props.template.sessions.length - 1;
        this.$props.template.sessions[this.index] = this.session;
        this.creating = false;
    },
    updateSession: function() {
      this.$props.template.sessions[this.index].name = this.sessionName;
      if (this.sessionName.length < 1) {
        this.creatable = false;
        this.$emit('notCreatable');
      } else {
        this.creatable = true;
        // if sessionName has no value change the placeholder text to display the error message
        // Naaz will refactor this to display an error message below the text field instead
        this.placeHolderText = "Session Name required to create template.";
        this.$emit('creatable');
      }
      if (this.creating) {
        this.createSession();
      }
    },
    fillFields: function(session) {
      this.sessionName = session.name;
      this.index = session.order - 1;
      this.session = {
        id: session.id,
        exercises: session.coach_exercises
      };

      this.exerciseCount = this.session.exercises.length;
      this.creating = false;
      this.$props.template.sessions[this.index] = this.session;
    },
    getSessionExercises: function(sessionId) {
      console.log(`session id: ${sessionId}`)
      axios.get(`${url}/coach/session?coach_session_id=${sessionId}`).then(response => {
        this.fillFields(response.data);
      }).catch(error => {
        this.error = true;
      })
    },
    getExerciseId: function(exercise) {
      if (exercise.exercise_id) {
        return exercise.exercise_id;
      } else {
        return exercise.id;
      }
    }
  },
  mounted() {
     if (this.setsAndReps) {
      this.session = {
        id: 0,
        exercises: [],
      }
      this.getSessionExercises(this.$vnode.key);
    } else {
      this.session = {
        name: '',
        order: 0,
        coach_exercises: []
      }
      this.index = this.$props.template.sessions.length - 1;
    }
  }
}
</script>

<style lang="scss">

.custom-place-holder .v-text-field placeholder {
  color: red!important;
}
</style>