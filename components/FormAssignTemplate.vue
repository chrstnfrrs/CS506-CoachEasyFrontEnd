<template>
  <div>
    <div>
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
    <div v-if="assigning">
      <HeadingPage @sendRequest="assignTemplate()" status="Assign" message="Assign" />
      <div class="formCreateHeading">
        <v-text-field
          label="Name"
          v-model="templateName"
          required>
        </v-text-field>
        <button @click="createTemplate">
          <ButtonAddForm @newForm="addForm()" type="Session" v-if="getNameLength() && sessionCount===0"/>
        </button>
      </div>
      <div v-if="!creating">
        <FormCreateSession @newForm="addForm()" v-for="session in sessions" :key="session.id" :template="template" :setsAndReps="assigning"/>
      </div>
      <SpacerExtraSmall />
      <ButtonAddForm @newForm="addForm()" type="Session" v-if="sessionCount!==0"/>
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
      selectedTemplate: 'Select Template',
    }
  },
  components:{
    ButtonAddForm,
    FormCreateSession,
    SpacerExtraSmall,
    HeadingPage,
  },
  methods:{
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
      this.sessionCount = 0;
      let result = this.templateList.filter(obj => {
        return obj.name === value
      });
      this.assigning=true;
      this.template=result[0];
      console.log(this.template);
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
      this.$emit('assignTemplate', this.template);
    }
  },
  mounted() {
    this.template = this.$props.shouldCreate;
  }
}
</script>

<style lang="scss">
.selectAssignTemplate{
  max-width: 512px;
}
</style>