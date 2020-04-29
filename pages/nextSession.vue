<template>
    <!-- loading animation and spacer -->

  <div class="pageContent">
    <HeadingPage v-if="!loading" @updateStatus="editSession()" :status="this.editMessage" />
    <div v-if="!loading && !edit">
      <ViewSession :session="this.session" />
    </div>
    <div v-if="!loading && edit">
      <FormCompleteSession :session="this.session" />
      <ButtonViewSession @complete="completeSession" action="Complete" />
      <span v-if="confirmComplete" class="errorText">Complete session without entering weight and/or a comment? Press complete to confirm.</span>
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
import ButtonViewSession from "~/components/ButtonViewSession"
export default {
  components: {
    ViewSession,
    HeadingPage,
    FormCompleteSession,
    ButtonViewSession
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
      confirmComplete: false,
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
      if (!(this.comment &&  this.clientWeight) && !this.confirmComplete) {
        this.confirmComplete = true;
        console.log("Submit session without entering weight and/or comment?");
      } else {
        // console.log('completing session');
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
        //   console.log(response);
        // }).catch(error => {
        //   console.log(error);
        // });
      }
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
.errorText{
  color: red;
}
</style>