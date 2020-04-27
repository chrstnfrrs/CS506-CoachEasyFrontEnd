<template>
    <v-card class="listClientCard" @click.self="viewClient(client)">
      <div>{{client.first_name}} {{client.last_name}}</div>
      <div>
        <button 
          v-if="approve.includes(clientType)"
          @click="changeClient(client, 'approveClient')"
          class="primaryLightBackground actionBtn">
          Approve
        </button>
        <button 
          v-if="remove.includes(clientType)"
          @click.stop="deleteClient(client)"
          class="errorBackground actionBtn">
          Remove
        </button>
        <button 
          v-if="terminate.includes(clientType)"
          @click="changeClient(client, 'terminateClient')"
          class="errorBackground actionBtn">
          Remove
        </button>
      </div>
    </v-card>
</template>

<script>
import axios from 'axios'
const url = 'https://coach-easy-deploy.herokuapp.com';
axios.defaults.withCredentials = true;
export default {
  props:{
    client: Object,
    clientType: String
  },
  data() {
    return {
      approve: ['unapprovedClients','pastClients'],
      remove: ['unapprovedClients','pastClients'],
      terminate: ['approvedClients'],
    }
  },
  methods: {
    viewClient: function(client){
      const newPath = `/${this.$router.currentRoute.name}/${client.id}`;
      // this.$router.push({ path: newPath })
      window.location.assign('newPath')
    },
    updateClientList: function(){
      let self = this;
      axios.get(`${url}/clientList`).then(result => {
        self.clientList = result.data
      }).catch(error => {
      });
      this.setUpdate();
    },
    changeClient: function(data, endpoint){
      var self = this;
      axios.put(url+`/${endpoint}`, {
        id: data.id
      })
      .then(function (response) {
        self.updateClientList()
      })
      .catch(function (error) {
      });
    },
    deleteClient: function(data){
      var self = this;
      axios.delete(url+`/user?id=${data.id}`)
      .then(function (response) {
        self.updateClientList()
      })
      .catch(function (error) {
      });
    },
    setUpdate: function() {
      this.$emit('setUpdate');
    }
  },
}
</script>

<style lang="scss">
  .listClientCard{
    width: 100%;
    background: $background-secondary !important;
    padding: 8px 16px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>