<template>
  <component
    :data-tip="dataTip"
    :is="tag"
    class="m__e-table-col"
    :class="className"
    @dblclick="this.$emit('dblclick')"
  >
  <div class="m__e-table-col-over" 
    :style="{ width: width, minWidth: minWidth, maxWidth: maxWidth,textAlign: textAlign,color:color}">
    <slot />
  </div>
  </component>
</template>
<script>
export default {
  name: "MTableColumn",
  props: {
    tag: {
      type: String,
      default: "td",
    },
    className: {
      type: String,
      default: "",
    },
    width: {
      type: String,
    },
    minWidth: {
      type: String,
    },
    maxWidth: {
      type: String,
    },
    dataTip: {
      type: String,
    },
    textCenter: {
      type: Boolean,
      default: false,
    },
    textAlign: {
      type: String,
      enum: ["left","right","center"],
      default: "left",
    },
    color:{
      type: String,
    }
  },
};
</script>
<style scoped></style>
