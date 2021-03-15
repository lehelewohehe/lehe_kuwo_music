<template>
<div class="c-avatar" :style="{width: size, height: size}">
  <div class="c-avatar__wrapper" 
  style="background-size: cover" 
  :style="{'background-image': `url(${src ? src : unloginAvatar})`}">
  </div>
</div>
</template>

<script type="text/javascript">
import unloginAvatar from "@/assets/imgs/unlogin_avatar.jpg";
export default {
  props: {
    src: {
      type: String,
      default: unloginAvatar
    },
    size: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      unloginAvatar
    }
  },
  created(){

  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
.c-avatar {
  border-radius: 50%;
  overflow: hidden;
  &__wrapper {
    width: 100%;
    height: 100%;
    background-size: cover;
  }
}
</style>