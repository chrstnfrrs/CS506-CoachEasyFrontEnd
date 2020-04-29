<template>
  <div class="pageContent">
    <div v-if="!loading && view">
      <HeadingPage @updateStatus="editSession()" :status="this.editMessage" />
      <FormSessionInfo :session="this.session" label="Weight" />
      <ViewSession v-if="!editStatus" :session="this.session" />
      <FormViewSession v-if="editStatus" :session="this.session" />
      <SpacerSmall />
      <ButtonViewSession v-if="editStatus" @complete="completeSession()" action="Complete" />
      <FormSessionInfo :session="this.session" label="Comment" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
const url = "https://coach-easy-deploy.herokuapp.com";

import ViewSession from "~/components/ViewSession";
import ButtonViewSession from "~/components/ButtonViewSession"
import FormViewSession from "~/components/FormViewSession"
import SpacerSmall from '~/components/SpacerSmall'
import FormSessionInfo from '~/components/FormSessionInfo'
import HeadingPage from '~/components/HeadingPage'

export default {
  components: {
    ViewSession,
    ButtonViewSession,
    FormViewSession,
    SpacerSmall,
    FormSessionInfo,
    HeadingPage
  },
  data() {
    return {
      session: undefined,
      loading: true,
      id: undefined,
      view: true,
      editStatus: false,
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
      if (!(this.comment || this.clientWeight)) {
        console.log("Submit session without entering weight and/or commnet?");
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
      this.editStatus = !this.editStatus;
      this.editMessage = this.editStatus ? "Cancel" : "Start";
    }
  },
  mounted() {
    this.getSessionEditRole();
  }
};
</script>

<style lang="scss">

.exerciseClientCol{
  width: 100%;
  text-align: center;
  align-items: center;
  display: flex;
}
.exerciseFirstCol{
  padding-left: 16px;
  text-align: left;
}
.exerciseCoachGrid {
  min-width: 325px;
  display: grid;
  grid-template-columns: minmax(50px, 1fr) 55px 55px;
  justify-items: center;
  justify-content: center;
  background: $background-secondary !important;
}
.exerciseClientGrid {
  min-width: 400px;
  display: grid;
  grid-template-columns: minmax(50px, 1fr) 55px 55px 75px;
  justify-items: center;
  justify-content: center;
  background: $background-secondary !important;
  .v-text-field{
    max-width: 40px;
    min-width: 30px;
    margin-left:12px;
    flex: 1;
  }
}
</style>