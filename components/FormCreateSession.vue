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
      <ButtonAddForm @newExerciseForm="addExcerciseForm()" type="Exercise" v-if="exerciseCount===0 && sessionName.length > 0"/>
    </div>
    <div v-if="!creating">
      <FormCreateExercise  v-for="exercise in session.coach_exercises" :key="exercise.id" :session="session" :allContent="setsAndReps"/>
    </div>
    <ButtonAddForm @newExerciseForm="addExcerciseForm()" type="Exercise" v-if="exerciseCount!==0"/>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;
const url = 'https://coach-easy-deploy.herokuapp.com';

import ButtonAddForm from '~/components/ButtonAddForm'
import FormCreateExercise from '~/components/FormCreateExercise'
export default {
  components:{
    ButtonAddForm,
    FormCreateExercise,
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
      this.$emit('newForm')
    },
    addExcerciseForm: function(){
      this.exerciseCount++;
      this.session.coach_exercises.push({
      });
    },
    createSession: function() {
        this.session = {
          name: this.sessionName,
          order: this.$props.template.sessions.length + 1,
          coach_exercises: [],
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
      } else {
        this.$props.template.sessions[this.index].name = this.sessionName;
      }

    },
    fillFields: function(session) {
      this.session = session;
      this.sessionName = this.session.name;
      this.index = this.session.order - 1;
      this.exerciseCount = this.session.coach_exercises.length;
      this.creating = false;
      console.log(this.session);
    },
    getSessionExercises: function(sessionId) {
      axios.get(`${url}/coach/session?coach_session_id=${sessionId}`).then(result => {
        this.fillFields(result.data);
      }).catch(error => {
        this.error = true;
      })
    },
  },
  mounted() {
     if (this.$props.template.sessions.length > 0) {
      this.getSessionExercises(this.$vnode.key);
    }
  }
}
</script>

<style lang="scss">

.custom-place-holder .v-text-field placeholder {
  color: red!important;
}
</style>