<template>
<div class="c-avatar" :style="{width: size,height: size,borderRadius: fillet}">
  <div class="c-avatar__wrapper" 
  style="background-size: cover" 
  :style="{'background-image': `url(${src ? src : avatar})`}">
  </div>
</div>
</template>

<script type="text/javascript">
import {ref} from "vue";
export default {
  props: {
    src: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "100%"
    },
    fillet: {
      type: String,
      default: "50%"
    }
  },
  setup(props, context) {
    let avatar = ref("");
    return {
      avatar
    }
  }
}
</script>
<style lang="scss" scoped>
.c-avatar {
  overflow: hidden;
  &__wrapper {
    width: 100%;
    height: 100%;
    background-size: cover;
  }
}
</style>