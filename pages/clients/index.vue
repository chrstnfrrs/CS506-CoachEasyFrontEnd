<template>
<div class="pageContent" >
  <Loading v-if="loading"/>
  <MessageError v-if="error" :message="errorMessage"/>
  <div v-if="!loading && !error">
    <div
      v-for="(clients, clientType) in clientList"
      :key="clientType">
      <HeadingSection :text="getHeader(clientType)"/>
      <ContentList @shouldUpdate="updateClientList()" :clientList="clients" :clientType="clientType"/>
    </div>
  </div>
</div>
</template>

<script>
import Loading from '~/components/Loading'
import MessageError from '~/components/MessageError'
import HeadingSection from '~/components/HeadingSection'
import ContentList from '~/components/ContentList'

import axios from 'axios'
const url = 'https://coach-easy-deploy.herokuapp.com';
axios.defaults.withCredentials = true;

export default {
  components: {
    Loading,
    MessageError,
    HeadingSection,
    ContentList
  },
  data() {
    return {
      loading: true,
      error: false,
      errorMessage: 'Error',
      clientList: [],
    }
  },
  methods: {
    getHeader: function (header) {
      if(typeof(header) === 'string'){
        let slicePoint = header.indexOf("Clients");
        let str = header.slice(0, slicePoint);
        return str.charAt(0).toUpperCase() + str.slice(1) + " Clients";
      }
    },
    updateClientList: function(){
      let self = this;
      axios.get(`${url}/clientList`).then(result => {
        self.clientList = result.data
        self.loading = false;
        self.error = false;
      }).catch(error => {
        self.error = true;
        self.loading = false;
      });
    },
  },
  mounted() {
    this.updateClientList();
  },
}
</script>

<style lang="scss">
  .clientListHeader{
    margin-bottom: 16px;
  }
  .clientListCard{
    width: 100%;
    background: $background-secondary !important;
    padding: 8px 16px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>