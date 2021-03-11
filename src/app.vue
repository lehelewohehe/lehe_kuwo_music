<template>
<div class="p-app">
  <div class="p-app__wrapper">
    <div class="p-app__top">
      <div class="p-app__left">
        <c-sider-bar></c-sider-bar>
      </div>
      <div class="p-app__right">
        <div class="p-app__search"></div>
        <div class="p-app__container"></div>
      </div>
    </div>
    <div class="p-app__bottom">
      <div class="p-app__palyer"></div>
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
import CSiderBar from "@/components/sidebar.vue";
export default {
  data() {
    return {

    }
  },
  components: {
    CSiderBar
  },
  created(){
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
.p-app {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &__wrapper {
    width: 1010px;
    height: 630px;
    background: pink;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  &__top {
    width: 100%;
    height: 510px;
    flex: 1 1 0;
    display: flex;
    justify-content: flex-start;
  }
  &__left {
    width: 200px;
    height: 100%;
    background-color: $color-bg-middle;
  }
  &__right {
    flex: 1 1 0;
    height: 100%;
    background-color: $color-bg-shallow;
  }
  &__bottom {
    width: 100%;
    height: 70px;
    background-color: #101121;
  }
}
</style>