<template>
  <div>
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
    <FormCreateSession v-if="!creating" @newForm="addForm()" v-for="i in sessionCount" :key="i" :template="template"  />
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
      // console.log("Added session");
      // console.log(this.template);
    },
    createTemplate: function() {
      this.template.name = this.templateName,
      this.creating = false;
    },
    getNameLength: function() {
      return this.templateName.length > 0;
    },

  },
  mounted() {
    this.template = this.$props.shouldCreate;
  }
}
</script>

<style lang="scss">
</style>