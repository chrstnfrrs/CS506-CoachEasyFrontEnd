<template>
  <div class="pageContent">
    <div v-if="!loading && view">
      <ViewSession v-if="!editStatus" :session="this.session" />
      <FormViewSession v-if="editStatus" :session="this.session" />
      <ButtonViewSession v-if="!editStatus" @edit="editSession()" action="Edit" />
      <ButtonViewSession v-if="editStatus" @edit="editSession()" action="Done" />
      <ButtonViewSession @complete="completeSession()" action="Complete" />
      <v-text-field
        label="Comment"
        v-model="comment"
      >
      </v-text-field>
      <v-text-field
        label="Weight"
        v-model="clientWeight">
      </v-text-field>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
const url = "https://coach-easy-deploy.herokuapp.com";

import ViewSession from "~/components/ViewSession";
import ButtonViewSession from "~/components/ButtonViewSession"
import FormViewSession from "~/components/FormEditSession"

export default {
  components: {
    ViewSession,
    ButtonViewSession,
    FormViewSession,
  },
  data() {
    return {
      session: undefined,
      loading: true,
      id: undefined,
      view: true,
      editStatus: false,
      editMessage: "Edit",
      comment: '',
      clientWeight: 0,
    };
  },
  methods: {
    getSessionEditRole: function() {
      Promise.all([this.$store.state.userData]).then(
        () => {
          this.id = this.$store.state.userData.id;
          this.getNextSession(this.$store.state.userData.id);
        },
        () => {
          this.loadingFailed = true;
        }
      );
    },
    getNextSession: function(id) {
      axios
        .get(`${url}/client/session/next?client_id=${id}`)
        .then(result => {
          this.session = result.data;
          this.loading = false;
        })
        .catch(error => {
          console.log("error");
        });
    },
    completeSession: function() {
      console.log('completing session');
      let trainingEntries = [];
      this.session.exercises.forEach(ex => { 
        trainingEntries.push({
          name: ex.name,
          category: ex.category,
          sets: ex.sets,
          reps: ex.reps,
          weight: ex.weight,
          order: ex.order
        });
      });
      axios.put(`${url}/client/session`, {
        id: this.session.id,
        comment: this.comment,
        client_template_id: this.session.client_template_id,
        name: this.session.name,
        client_weight: this.clientWeight,
        completed: true,
        training_entries: trainingEntries,
        exercises: this.session.exercises
      }).then(response => {
        console.log(response);
      }).catch(error => {
        console.log(error);
      });
    },
    editSession: function() {
      this.editStatus = !this.editStatus;
      console.log('editing session');
    }
  },
  mounted() {
    console.log("here");
    this.getSessionEditRole();
  }
};
</script>

<style lang="scss">
</style>