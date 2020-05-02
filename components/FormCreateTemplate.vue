<template>
  <div>
    <div class="formCreateHeading">
      <v-text-field
        :class="{ 'custom-place-holder': !creatable }"
        label="Template Name"
        v-model="templateName"
        required
        @input="updateTemplate"
        :placeholder="placeholderText">
      </v-text-field>
      <button @click="createTemplate">
        <ButtonAddForm @newForm="addForm()" type="Session" v-if="getNameLength() && sessionCount===0"/>
      </button>
    </div>
    <FormCreateSession v-if="!creating" @creatable="isCreatable()" @notCreatable="isNotCreatable()" @newForm="addForm()" v-for="session in template.sessions" :key="session.id" :template="template" :setsAndReps="assigning"  />
    <SpacerExtraSmall />
    <ButtonAddForm @newForm="addForm()" type="Session" v-if="sessionCount!==0"/>
  </div>
</template>

<script>
import ButtonAddForm from '~/components/ButtonAddForm'
import FormCreateSession from '~/components/FormCreateSession'
import SpacerExtraSmall from '~/components/SpacerExtraSmall'
export default {
  props:{
    type: String,
    shouldCreate: Object,
  },
  data() {
    return {
      sessionCount: 0,
      templateName: '',
      template: {},
      creating: true,
      creatable: true,
      placeholderText: "Name",
      assigning: false
    }
  },
  components:{
    ButtonAddForm,
    FormCreateSession,
    SpacerExtraSmall
  },
  methods:{
    addForm: function(){
      this.sessionCount++;
<<<<<<< HEAD
      // console.log("Added session");
      // console.log(this.template);
=======
      this.template.sessions.push({});
>>>>>>> upstream/master
    },
    createTemplate: function() {
      this.template.name = this.templateName,
      this.creating = false;
    },
    getNameLength: function() {
      return this.templateName.length > 0;
    },
    isNotCreatable: function() {
      this.$emit('notCreatable');
    },
    isCreatable: function() {
      this.$emit('creatable');
    },
    updateTemplate: function() {
      this.template.name = this.templateName;
      if (this.templateName.length < 1 || this.sessionCount < 1) {
        // if the template name is blank or we do not have a session then display the error message in the placeholder text
        // not ideal because it won't display if we have a template name but no session
        // Naaz will refactor this to display an error message below the text field 
        this.placeholderText = "Template name and at least one session required to create."
        this.creatable = false;
        this.isNotCreatable();
      } else {
        this.creatable = true;
        this.isCreatable();
      }
    }

  },
  mounted() {
    this.template = this.$props.shouldCreate;
  }
}
</script>

<style lang="scss">
.custom-place-holder input::placeholder {
  color: red!important;
}
</style>