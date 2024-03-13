<template>
  <div class="m-main">
    <the-sidebar></the-sidebar>
    <div class="m-content">
      <the-header></the-header>
      <div  class="m-main-content">
        <router-view></router-view>
      </div>
    </div>
    
  </div>
</template>

<script>
import TheHeader from '../components/header/TheHeader.vue';
import TheSidebar from '../components/sidebar/TheSidebar.vue';
export default {
  components: { TheSidebar, TheHeader },
  name: 'MisaMainLayout',

  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>