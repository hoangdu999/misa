<template>
  <div class="m-main">
    <TheSidebar ></TheSidebar>
    <div class="m-content">
      <TheHeader ></TheHeader>
      <div class="m-main-content">
          <router-view />
      </div>
    </div>
  <MToastList  />
  </div>
  
</template>
<script>
import TheHeader from '@/components/header/TheHeader.vue'
import TheSidebar from '@/components/slidebar/TheSidebar.vue'

export default {
  name: "MainLayout",
  components: {
    TheHeader,
    TheSidebar,
  },
};
</script>
<style scoped>
</style>
