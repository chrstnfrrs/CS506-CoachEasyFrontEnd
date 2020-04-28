<template>
  <div>
    <MessageError v-if="error" :message="errorMessage" />
    <draggable v-model="sessionList" @end="reorderSessionList()">
    <ListItem 
      v-for="(session) in sessionList"
      :key="session.id"
      :deleteStatus="truthVar"
      type="session"
      :items="session"
      :slug="session.slug"
      @sendDelete="deleteObject(session.id)" />
    </draggable>
    <FormCreateSession :template="template" v-for="i in sessionCount" :key="i"/>
    <FormCreateExercise :session="session" v-for="i in exerciseCount" :key="i" />
    <ButtonAddForm v-if="isTemplate()" @newForm="addSessionForm()" type="Session"/>
    <ButtonAddForm v-if="!isTemplate()" @newExerciseForm="addExerciseForm()" type="Exercise"/>
  </div>
</template>

<script>
import Loading from '~/components/Loading'
import ListItem from '~/components/ListItem'
import MessageError from '~/components/MessageError'
import draggable from 'vuedraggable'
import FormCreateSession from '~/components/FormCreateSession'
import FormCreateExercise from '~/components/FormCreateExercise'
import ButtonAddForm from '~/components/ButtonAddForm'

import axios from 'axios'
axios.defaults.withCredentials = true;
const url = 'https://coach-easy-deploy.herokuapp.com';

export default {
  components:{
    Loading,
    ListItem,
    MessageError,
    draggable,
    FormCreateSession,
    FormCreateExercise,
    ButtonAddForm
  },
  props: {
    templateList: Object
  },
  data() {
    return {
      truthVar: true,
      loading: true,
      error: false,
      errorMessage: '',
      drag: false,
      items: {},
      sessionList: [],
      sessionCount: 0,
      exerciseCount: 0,
      template: {},
      session: {},
    }
  },
  methods: {
    isTemplate: function(){
      console.log(this.$router.currentRoute.name);
      if(this.$router.currentRoute.name === 'template-id' || this.$router.currentRoute.name === 'clients-id') {
        this.template = this.$props.templateList;
        console.log(this.template);
        return true;
      } else {
        this.session = this.$props.templateList;
        return false
      }
    },
    addSessionForm: function(){
      this.sessionCount++;
    },
    addExerciseForm: function(){
      this.exerciseCount++;
    },
    updateSessionList: function () {

      this.session = this.$props
      if(this.isTemplate()){
        this.sessionList = this.templateList.sessions;
      } else {
        this.sessionList = this.templateList.coach_exercises;
      }
      this.loading = false;
    },
    reorderSessionList: function () {
      let index = 1;
      this.sessionList.forEach(session => {
        session.order = index;
        index++;
      });
    },
    updateReorderKey: function() {
      this.reorderKey += 1;
    },
    deleteObject: function(id) {
      if (this.isTemplate()) {
        this.deleteSession(id);
      } else {
        this.deleteExercise(id);
      }
    },
    deleteSession: function(sessionId) {
      let sessionIndex = this.templateList.sessions.map(function(e) { return e.id}).indexOf(sessionId);
      if (sessionIndex > -1) {
        this.templateList.sessions.splice(sessionIndex, 1);
      }u
    },
    deleteExercise: function(exerciseId) {
      let exerciseIndex = this.templateList.coach_exercises.map(function(e) { return e.id}).indexOf(exerciseId);
      if (exerciseIndex > -1) {
        this.templateList.coach_exercises.splice(exerciseIndex, 1);
      }
    }
  },

  mounted() {
    this.updateSessionList();
  },
}
</script>

  
