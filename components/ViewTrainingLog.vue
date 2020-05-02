<template>
  <div>
    <HeadingPage name="Training Log"/>
    <MessageRedirect 
      message="View Training Log"
      :link="`/trainingLog?client_id=${id}`"/>
  </div>
</template>

<script>
import HeadingPage from '~/components/HeadingPage'
import MessageRedirect from '~/components/MessageRedirect'
export default {
  components:{
    HeadingPage,
    MessageRedirect
  },
  props: {
    id: Number
  }
}
</script>

<style>

</style>