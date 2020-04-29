<template>
<div>
  <v-text-field
    v-if="this.label === 'Weight'"
    :label="this.label"
    v-model="session.client_weight">
  </v-text-field>
  <v-text-field
    v-if="this.label === 'Comment'"
    :label="this.label"
    v-model="session.comment">
  </v-text-field>
</div>
</template>

<script>
export default {
  props: {
    session: Object,
    label: String
  }
}
</script>

<style>

</style>
