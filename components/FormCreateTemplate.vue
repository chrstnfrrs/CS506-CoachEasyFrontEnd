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
    <FormCreateSession v-if="!creating" @creatable="isCreatable()" @notCreatable="isNotCreatable()" @newForm="addForm()" v-for="i in sessionCount" :key="i" :template="template"  />
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
      placeholderText: "Name"
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