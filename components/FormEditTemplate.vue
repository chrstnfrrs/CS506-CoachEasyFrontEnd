<template>
  <div>
    <MessageError v-if="error" :message="errorMessage" />
    <draggable v-model="sessionList" @end="reorderSessionList()">
    <ListItem 
      v-for="(session) in sessionList"
      :key="session.id"
      :deleteStatus="truthVar"
      type="session"
      :items="session" />
    </draggable>
    <FormCreateSession v-for="i in sessionCount" :key="i"/>
    <FormCreateExercise v-for="i in exerciseCount" :key="i" solo="true"/>
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
      exerciseCount: 0
    }
  },
  methods: {
    isTemplate: function(){
      if(this.$router.currentRoute.name === 'template-id')
        return true;
      return false
    },
    addSessionForm: function(){
      this.sessionCount++;
    },
    addExerciseForm: function(){
      this.exerciseCount++;
    },
    updateSessionList: function () {
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
    }
  },
  mounted() {
    this.updateSessionList();
  },
}
</script>

<style lang="scss">
  
