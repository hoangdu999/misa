<template>
  <div class="m__header">
    <div class="m__header-left">
      <div
        class="m__header-bar"
        :class="toggleSidebar ? 'icon-bar' : ''"
        @click="toggleSidebarChange"
      ></div>
      <div class="m__header-name">
        <div class="m__header-name__content">
          Công ty TNHH Sản Xuất - Thương mại - Dịch vụ Qui Phúc
        </div>
        <!-- <div class="m__header-name__icon icon-drop"></div> -->
      </div>
    </div>
    <div class="m__header-right">
      <div class="m__header-notification icon-notification" data-tip="Tính năng chưa phát triển" ></div>
      <div class="m__header-setting" >
        <div class="setting__avt" data-tip="Tính năng chưa phát triển" >
          <img src="../../assets/img/default-avatar.jpg" alt="avt" />
        </div>
        <div class="setting__info">
          <div class="setting__info-name">Nguyễn Văn Dương</div>  
          <div class="setting__info-icon icon-drop"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  emits: ["toggle-sidebar"],

  data() {
    return {};
  },

  mounted() {},

  methods: {
    toggleSidebarChange() {
      this.toggleSidebar = false;
      this.$state.toggleSidebar = false;
    },
  },
  watch: {
    "$state.toggleSidebar": function () {
      this.toggleSidebar = this.$state.toggleSidebar;
    },
  },
};
</script>
