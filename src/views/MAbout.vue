<template>
  <h1>About</h1>
  <MTableColumnVue :className="['active','admin']" />
</template>

<script>
import MTableColumnVue from '@/components/table-column/MTableColumn.vue'
export default {
    name : "MAbout",
    components:{
      MTableColumnVue
    },
    data() {
      return {
      }
    },
}
</script>

<style>

</style>