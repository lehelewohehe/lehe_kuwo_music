<template>
<div class="c-sidebar">
  <div class="c-sidebar__login" @click="createLoginWindow()">
    <div class="c-sidebar__avatar">
      <c-avatar size="36px"></c-avatar>
    </div>
    <div class="c-sidebar__nickname">点此登录</div>
    <div class="c-sidebar__icon"></div>
  </div>
  <div class="c-sidebar__list" v-for="(item, index) in sidebar">
    <div class="c-sidebar__title" v-if="item.title">{{item.title}}</div>
    <div class="c-sidebar__item" 
    :class="{active: item.active }" 
    v-for="(item, index) in item.list"
    @click="selectItem(item)">
      <i class="c-sidebar__item__icon iconfont" :class="item.icon"></i>
      <div class="c-sidebar__item__name">{{item.name}}</div>
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
import {ref} from "vue";
import {doLoginByCellPhone} from "@/request/index.js";
import {createLoginWindow} from "@/components/hook.js";
export default {
  setup(props, context) {
    let sidebar = ref([
      {
        title: "",
        list: [
          {
            icon: "icontuijian",
            name: "推荐",
            active: true
          },
          {
            icon: "iconluyinjishouyinjidiantai",
            name: "电台",
            active: false
          },
          {
            icon: "iconshipin",
            name: "视频",
            active: false
          },
          {
            icon: "iconguankanzhibo",
            name: "直播",
            active: false
          },
        ]
      },
      {
        title: "我的音乐",
        list: [
          {
            icon: "icondiantai",
            name: "我的电台",
            active: false
          },
          {
            icon: "iconxiazai",
            name: "下载管理",
            active: false
          },
          {
            icon: "icondiannaopcxianshiqi",
            name: "本地音乐",
            active: false
          },
          {
            icon: "iconlishijilu",
            name: "最近播放",
            active: false
          }
        ]
      },
      {
        title: "自建音乐",
        list: [
          {
            icon: "icongedan",
            name: "默认列表",
            active: false
          }
        ]
      }
    ]);
    const selectItem = function(target) {
      sidebar.value.forEach((item) => {
        for(let i = 0; i < item.list.length; i++) {
          if(item.list[i].active) {
            item.list[i].active = false;
            return;
          }
        }
      });
      target.active = true;
    }

    return {
      selectItem,
      createLoginWindow,
      sidebar
    }
  },
  created(){
    // doLoginByCellPhone({
    //   data: {
    //     phone: "13437249059",
    //     password: "zq351590006"
    //   }
    // }).then((data) => {
    //   console.log(data, 123);
    // });
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
.c-sidebar {
  width: 100%;
  height: 100%;
  &__login {
    height: 60px;
    padding-left: 25px;
    line-height: 60px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: $font-size-s;
    cursor: pointer;
  }
  &__nickname {
    width: 50%;
    margin: 0px 5px;
    text-align: center;
  }
  &__item {
    height: 35px;
    padding-left: 35px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: $font-size-s;
    cursor: pointer;
    &__name {
      margin-left: 10px;
    }
    &:hover {
      background-color: rgba(255, 210, 0, 0.2);
    }
    &.active {
      background-color: $color-main;
    }
  }
  &__title {
    font-size: $font-size-xs;
    padding: 20px 0px 10px 36px;
    color: $color-font-gray;
  }
}
</style>