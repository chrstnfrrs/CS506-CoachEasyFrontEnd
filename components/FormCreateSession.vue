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
      <FormCreateExercise  v-for="i in exerciseCount" :key="i" :session="session" :allContent="setsAndReps"/>
    </div>
    <ButtonAddForm @newExerciseForm="addExcerciseForm()" type="Exercise" v-if="exerciseCount!==0"/>
  </div>
</template>

<script>
import ButtonAddForm from '~/components/ButtonAddForm'
import FormCreateExercise from '~/components/FormCreateExercise'
export default {
  components:{
    ButtonAddForm,
    FormCreateExercise,
  },
  props: {
    template: Array,
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
    },
    createSession: function() {
        this.session = {
          name: this.sessionName,
          order: this.$props.template.sessions.length + 1,
          coach_exercises: [],
        }
        this.$props.template.sessions.push(this.session);
        this.index = this.$props.template.sessions.length - 1;
        this.creating = false;
    },
    updateSession: function() {
      if (this.sessionName.length < 1) {
        this.creatable = false;
        this.$emit('notCreatable');
      } else {
        this.creatable = true;
        this.placeHolderText = "Session Name required to create template.";
        this.$emit('creatable');
      }
      if (this.creating) {
        this.createSession();
      } else {
        this.$props.template.sessions[this.index].name = this.sessionName;
      }

    }
  },
}
</script>

<style lang="scss">

.custom-place-holder .v-text-field placeholder {
  color: red!important;
}
</style>