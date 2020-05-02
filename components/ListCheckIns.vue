<template>
  <div>
    <HeadingPage name="Check Ins" />
    <SpacerExtraSmall />
    <ListItem
        v-if="checkIns.completed" 
        v-for="checkin in checkIns.completed"
        status="complete"
        :key="checkin.id"
        type="checkin"
        :items="checkin"/>
    <ListItem 
      v-if="checkIns.uncompleted"
      v-for="checkin in checkIns.uncompleted"
      status="uncomplete"
      :key="checkin.id"
      type="checkin"
      :items="checkin"/>
    <h2 v-if="!(checkIns.completed && checkIns.uncompleted)"> No Check Ins to View! </h2>
  </div>
</template>

<script>
import ListItem from '~/components/ListItem'
import HeadingPage from '~/components/HeadingPage'
import SpacerExtraSmall from '~/components/SpacerExtraSmall'
export default {
  components: {
    ListItem,
    HeadingPage,
    SpacerExtraSmall
  },
  props:{
    checkIns: Object
  }
}
</script>

<style>

</style>
