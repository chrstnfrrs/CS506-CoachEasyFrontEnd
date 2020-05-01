<template>
  <div class="listRow">
    <v-card v-if="!(type === 'checkin')" class="listCard"  :to="`/${type}/${items.slug}`" :class="{disable: (isDisabled)}">
      <p class="listItem">{{ items.name }}</p>
    </v-card>
     <v-card v-if="type === 'checkin'" class="listCard"  :to="`/checkin?id=${items.id}`" :class="{disable: (isDisabled), completed: this.isCompleted()}">
      <p class="listItem">{{ this.formatDate(items) }}</p>
    </v-card>
    <button @click="sendDelete" v-if="deleteStatus" class="buttonDelete errorBackground"><v-icon dark>mdi-delete</v-icon></button>
  </div>
</template>

<script>
export default {
  props: {
    deleteStatus: Boolean,
    items: Object,
    type: String,
    id: Number,
    status: String
  },
  data() {
    return {
      role: ''
    }
  },
  computed:{
    isDisabled: function(){
      return this.$route.params.sid
    },
  },
  methods: {
    sendDelete: function() {
      this.$emit('sendDelete');
    },
    isCompleted: function() {
      return this.$props.status == 'complete'; 
    },
    formatDate: function(checkin) {
      let startDate = checkin.start_date.split("-");
      let year = startDate[0];
      startDate.shift();
      startDate.push(year.substring(2,4));
      let endDate = checkin.end_date.split("-");
      year = endDate[0];
      endDate.shift();
      endDate.push(year.substring(2,4));
      return `Sessions from ${startDate.join("/")} to ${endDate.join("/")}`;
    }
  },
  mounted(){
    Promise.all([ this.$store.state.userData ]).then( () => {
      this.role = this.$store.state.userData.role
    },() => {
    });
  },
}
</script>

<style lang="scss">

</style>

