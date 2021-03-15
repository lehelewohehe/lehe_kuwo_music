<template>
<div class="c-search">
  <div class="c-search__wrapper">
    <div class="c-search__input">
      <input type="text">
    </div>
    <div class="c-search__icon flex-center">
      <i class="iconfont iconsousuo"></i>
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {

    }
  },
  created(){

  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
.c-search {
  width: 240px;
  height: 28px;
  background-color: $color-bg-deep;
  color: $color-font-gray;
  border-radius: 14px;
  padding: 0px 14px;
  overflow: hidden;
  display: flex;
  align-items: center;
  &__wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-content: center;
  }
  &__input {
    flex: 1 1 0;
    input {
      background-color: $color-bg-deep;
      font-size: $font-size-s;
      color: $color-font-gray;
      outline: none;
      border: none;
      width: 100%;
    }
  }
  &__icon {
    width: 20px;
    cursor: pointer;
  }
}
</style>