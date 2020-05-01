<template>
  <div>
    <HeadingPage class="clientListHeader" @updateStatus="assignStatus()" :name="`${clientName} Template`" :status="buttonMessage" :message="buttonMessage" />
    <div v-if="shouldAssignTemplate">
      <v-select
      :items="templateList"
      item-text="name"
      item-value="name"
      v-model="selectedTemplate"
      label="Select Template"
      class="selectAssignTemplate"
      @change="selectTemplate">
      </v-select>
    </div>
    <div v-else>
      <div class="formCreateHeading">
        <v-text-field
          label="Selected Template Name"
          v-model="templateName"
          required>
        </v-text-field>
      </div>
    </div>
    <div v-if="assigning">
      <FormCreateSession v-if="template" v-for="session in sessions" :key="session.id" :template="template" :setsAndReps="assigning" />
      <button
          class="actionBtn"
          @click="assignStatus()">
            Assign
      </button>
    </div>
  </div>
</template>

<script>
import ButtonAddForm from '~/components/ButtonAddForm'
import FormCreateSession from '~/components/FormCreateSession'
import SpacerExtraSmall from '~/components/SpacerExtraSmall'
import HeadingPage from '~/components/HeadingPage'
export default {
  props:{
    type: String,
    shouldCreate: Object,
    templates: Array,
    hasTemplate: Boolean,
    clientName: String,
  },
  data() {
    return {
      sessionCount: 0,
      templateName: '',
      templateList: this.templates,
      sessions: [],
      template: {},
      creating: true,
      assigning: true,
      selectedTemplate: 'No Template Selected',
      shouldAssignTemplate: undefined,
      buttonMessage: undefined,
    }
  },
  components:{
    ButtonAddForm,
    FormCreateSession,
    SpacerExtraSmall,
    HeadingPage,
  },
  methods:{
    // not used because assigning a template is static
    addForm: function(){
      this.sessionCount++;
      this.sessions.push({
        id: undefined,
        exercises: []
      });
    },
    createTemplate: function() {
      this.template.name = this.templateName,
      this.creating = false;
    },
    getNameLength: function() {
      return this.templateName.length > 0;
    },
    selectTemplate: function(value){
      this.creating = true;
      this.assigning = true;
      this.sessionCount = 0;
      let result = this.templateList.filter(obj => {
        return obj.name === value
      });
      console.log('selected new template');
      console.log(result);
      this.template=result[0];
      this.sessions = this.template.sessions;
      if (this.template) {
        this.fillFields();
      }

    },
    fillFields: function() {
      this.templateName = this.template.name;
      this.sessionCount = this.template.sessions.length;
      this.createTemplate();
    },
    assignTemplate: function() {
      if (this.template) {
        this.$emit('assignTemplate', this.template);
        this.shouldAssignTemplate = false;
        this.assigning = false;
      }
    },
    assignStatus: function() {
      this.buttonMessage = this.shouldAssignTemplate ? "Change" : "Back";
      if (this.buttonMessage == "Back") {
        this.assigning = true;
        this.creating = true;
      } else {
        this.assigning = false;
      }
      this.shouldAssignTemplate = !this.shouldAssignTemplate;
    },
    changeButtonMessage: function(hasTemplate) {
      if (hasTemplate) {
        this.buttonMessage = "Change";
      } else {
        this.buttonMessage = "Assign";
        this.shouldAssignTemplate = false;
      }
    }
  },
  mounted() {
    this.template = this.$props.shouldCreate;
    if (this.$props.shouldCreate.name) {
      this.templateName = this.$props.shouldCreate.name;
    }
    this.shouldAssignTemplate = !this.$props.hasTemplate;
    this.changeButtonMessage(this.$props.hasTemplate);
  }
}
</script>

<style lang="scss">
.selectAssignTemplate{
  max-width: 512px;
}
</style>