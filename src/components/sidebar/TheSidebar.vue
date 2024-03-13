<template>
  <div class="sidebar-menu" :class="toggleSidebar ? '' : 'm-menu-collapse'">
    <div class="sidebar__header">
      <div
        class="sidebar__header-icon__dots"
        @click="toggleSidebarChange"
        :class="toggleSidebar ? 'icon-dots' : 'icon-bar-white'"
      ></div>
      <div class="sidebar__header-brand__logo">
        <img
          src="../../assets/img/Logo_Module_TiengViet_White.66947422.svg"
          alt="logo"
        />
      </div>
    </div>
    <div class="m-menu">
      <div class="m-menu__list">
        <router-link
          :to="item.path"
          v-for="(item, index) in listMenuItem"
          :key="index"
          class="m-menu__list-item-link"
          ><li
            class="m-menu__list-item"
            :class="itemActive == index ? 'active' : ''"
            :key="index"
            @click="activeItem(index)"
          >
            <div class="m-menu__list-item-icon" :class="item.classIcon"></div>
            <div class="m-menu__list-item-title menu-item-text">
              {{ item.text }}
            </div>
          </li></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import constants from "../../assets/js/constants";

export default {
  name: "TheSidebar",

  data() {
    return {
      toggleSidebar: true,
      listMenuItem: constants.SidebarMenu,
      itemActive: 0,
    };
  },

  mounted() {},

  methods: {
    activeItem(index) {
      this.itemActive = index;
    },
    toggleSidebarChange() {
      if (!this.toggleSidebar) {
        this.$state.toggleSidebar = true;
        this.toggleSidebar = true;
      }
    },
  },
};
</script>
