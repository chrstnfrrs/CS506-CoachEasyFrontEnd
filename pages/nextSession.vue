<template>
    <!-- loading animation and spacer -->
  <div class="pageContent">
    <Loading v-if="loading" />
    <HeadingPage v-if="!loading" @updateStatus="editSession()" :status="this.editMessage" />
    <SpacerExtraSmall />
    <div v-if="!loading && !edit">
      <ViewSession :session="this.session" />
    </div>
    <div v-if="!loading && edit">
      <FormCompleteSession @complete="completeSession()" :session="this.session" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
const url = "https://coach-easy-deploy.herokuapp.com";

import ViewSession from "~/components/ViewSession";
import HeadingPage from "~/components/HeadingPage"
import FormCompleteSession from "~/components/FormCompleteSession"
import Loading from "~/components/Loading"
import SpacerExtraSmall from "~/components/SpacerExtraSmall"
export default {
  components: {
    ViewSession,
    HeadingPage,
    FormCompleteSession,
    Loading,
    SpacerExtraSmall
  },
  data() {
    return {
      session: undefined,
      loading: true,
      id: undefined,
      edit: false,
      editMessage: "Start",
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
      // this.editStatus = false;
      // let trainingEntries = [];
      // this.session.exercises.forEach(ex => { 
      //   trainingEntries.push({
      //     name: ex.name,
      //     category: ex.category,
      //     sets: ex.sets,
      //     reps: ex.reps,
      //     weight: ex.weight,
      //     order: ex.order
      //   });
      // });
      // axios.put(`${url}/client/session`, {
      //   id: this.session.id,
      //   comment: this.comment,
      //   client_template_id: this.session.client_template_id,
      //   name: this.session.name,
      //   client_weight: this.clientWeight,
      //   completed: true,
      //   training_entries: trainingEntries,
      //   exercises: this.session.exercises
      // }).then(response => {
      //   this.getNextSession();
      //   console.log(response);
      // }).catch(error => {
      //   console.log(error);
      // });
    },
    editSession: function() {
      this.edit = !this.edit;
      this.editMessage = this.edit ? "Cancel" : "Start";
    }
  },
  mounted() {
    this.getSessionEditRole();
  }
};
</script>

<style lang="scss">

</style>