<template>
<div class="c-sidebar">
  <div class="c-sidebar__login" @click="onLogin">
    <div class="c-sidebar__avatar">
      <c-avatar size="36px" :src="profile.avatarUrl || defaultAvatar"></c-avatar>
    </div>
    <div class="c-sidebar__nickname">{{profile.nickname || "点击登录"}}</div>
    <div class="c-sidebar__icon"></div>
    <c-user-box style="position: absolute;left: 10px;top: 10px;" :list="userList"
    @click="onPersonalService" v-if="isLogin && boxVisible"></c-user-box>
  </div>
  <div class="c-sidebar__list" v-for="(item, index) in sidebar">
    <div class="c-sidebar__title" v-if="item.title">{{item.title}}</div>
    <div class="c-sidebar__item" 
    :class="{active: item.active }" 
    v-for="(item, index) in item.list"
    @click="onSelectItem(item)">
      <i class="c-sidebar__item__icon iconfont" :class="item.icon"></i>
      <div class="c-sidebar__item__name">{{item.name}}</div>
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
import {ref} from "vue";
import unloginAvatar from "@/assets/imgs/unlogin_avatar.jpg";
import {mapState, useStore, mapGetters} from "vuex";
import {doLoginByCellPhone, quitLogin} from "@/request/index.js";
import {createLoginWindow, toast} from "@/components/hook.js";
export default {
  setup(props, context) {
    let store = useStore();
    let defaultAvatar = ref(unloginAvatar);
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
    let userList = ref([
      {icon: "icongeren", name: "个人主页", path: ""},
      {icon: "iconhuiyuanzhongxin", name: "会员中心", path: ""},
      {icon: "icongedan", name: "还原歌单", path: ""},
      {icon: "iconxiugai", name: "修改密码", path: ""},
      {icon: "icontuichu", name: "退出登录", path: ""}
    ]);
    // 用于存储登录状态相关的信息
    let boxVisible = ref(false);
    // 切换当前子项
    const onSelectItem = function(target) {
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
    // 登录
    let onLogin = function() {
      // 已登录
      if(store.getters.isLogin) {
        boxVisible.value = !boxVisible.value;
      }else {
        createLoginWindow()
      }
    }
    // 用户个人业务
    let onPersonalService = function(e) {
      switch(e) {
        case "icongeren": {

        } break;
        case "iconhuiyuanzhongxin": {

        } break;
        case "icongedan": {

        } break;
        case "iconxiugai": {

        } break;
        case "icontuichu": {
          quitLogin().then(data => {
            console.log(data, "quit");
            toast({
              message: "退出成功"
            });
            store.commit("setLoginInfo", {});
          });
        } break;
        default: ;
      }
      boxVisible.value = false;
    }

    return {
      onSelectItem,
      onPersonalService,
      sidebar,
      onLogin,
      userList,
      boxVisible,
      defaultAvatar
    }
  },
  computed: {
    ...mapState({
      profile: state => state.user.profile
    }),
    ...mapGetters(["isLogin"])
  }
}
</script>
<style lang="scss" scoped>
.c-sidebar {
  width: 100%;
  height: 100%;
  &__login {
    position: relative;
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