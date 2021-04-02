<template>
<div class="c-swiper" @mouseover="onShowArrow" @mouseout="onHideArrow">
  <div class="whole">
    <div class="roll-img">
      <span class="last" @click="after" v-show="showArrow">
        <i class="iconfont iconzuo"></i>
      </span>       
      <!-- 图片容器 -->
      <ul id="ul">
        <li @click="change($event)" 
        v-for="(item, index) in banner" 
        :class="classes[index]">
        <img @dragstart.prevent.stop
        @dragenter.prevent.stop
        @dragover.prevent.stop
        :src="item.pic"></li>
      </ul>
      <span class="next" @click="before" v-show="showArrow">
        <i class="iconfont iconyou"></i>
      </span>
    </div>
  </div>
  <div class="list">
    <!-- 指示灯 -->
    <span class="btn" v-for="(item, index) in classes" 
    :key="index" :class="[item == 'center' ? 'active' : '']"
    @mouseenter="jump(index)"></span>
  </div>
</div>
</template>
 
<script>
import {toRefs, ref, watch, onUnmounted} from "vue";
export default {
  props: {
    banner: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  setup(props, context) {
    let {banner} = toRefs(props);
    let showArrow = ref(false);
    let timer = ref(null);
    let classes = ref([]);

    watch(banner, () => {
      banner.value.forEach((item, index) => {
        if(index > 2) {
          classes.value.push('other');
        } else {
          index == 0 && classes.value.push('left');
          index == 1 && classes.value.push('center');
          index == 2 && classes.value.push('right');
        }
      });
    });

    let before = function() {
      let last = classes.value.pop();
      classes.value.unshift(last);
    }
    let after = function() {
      let first = classes.value.shift();
      classes.value.push(first);
    }
    let change = function(e) {
      if(e.target.parentNode.classList.contains('left')) {
        after();
      } else if (e.target.parentNode.classList.contains('right')) {
        before()
      } else {
        return false;
      }
    }
    let jump = function(index) {
      let count = classes.value.length;
      classes.value.fill("other");
      classes.value[index] = "center";
      classes.value[(index - 1 + count) % count] = "left";
      classes.value[(index + 1 + count) % count] = "right";
    }

    let onShowArrow = function() {
      showArrow.value = true;
      clearInterval(timer.value)
    };
    let onHideArrow = function() {
      showArrow.value = false;
      timer.value = setInterval(() => {
        before();
      }, 2000);
    };
    timer.value = setInterval(() => {
      before();
    }, 2000);

    onUnmounted(() => {
      clearInterval(timer.value);
    });

    return {
      showArrow,
      classes,
      timer,
      before,
      after,
      jump,
      change,
      onShowArrow,
      onHideArrow
    }
  }
}
</script>
 
<style lang="scss" scoped>
.c-swiper {
  width: 100%;
  height: 200px;
  position: relative;
  .whole {
    width: 70%;
    height: 100%;
    margin: 0 auto;
    .roll-img {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      ul li {
        position: absolute;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
  }
}
img{
    width: 100%;
    height: 100%;
}
        
.left{
  transform: scale(0.9);
  left: -26%;
  bottom: -5%;
  z-index: 4;
  background: rgb(0,0,0);
  transition: all 0.5s ease;
}
.center{
  z-index: 6;
  left: 0;
  bottom: 0px;
  transition: all 0.5s ease;
}
.right{
  transform: scale(0.9);
  left: 26%;
  bottom: -5%;
  z-index: 4;
  background: rgb(0,0,0);
  transition: all 0.5s ease;
}
.left div,.right div{
  z-index: 5;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  position: absolute;
  left: 0;
  top: 0;
  transition: all 0.5s ease;
}
.other{
  z-index: 3;
  left: 0;
  bottom: -5%;
  // visibility: hidden;
  transform: scale(0);
  transition: all 0.5s ease;
}
.last,.next{
  position: absolute;
  z-index: 10;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  font-weight: bold;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
  top: 55%;
  transform: translateY(-50%);
  color: rgba(255,255,255,0.6);
  .iconfont {
    font-size: 26px;
  }
}
.list{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 5%;
  width: 40%;
  height: 5px;
  display: flex;
  z-index: 6;
}
.btn{
  transition: background 0.3s ease;
  flex: 1;
  background: $color-bg-deep;
  border-radius: 2px;
  cursor: pointer;
  margin: 0px 6px;
}
.btn:not(:first-child){
  // margin-left: 10px;
}
.last{
  left: -16%;
}
.next{
  right: -16%;
}
// 指示灯
.btn.active {
  background: $color-main;
  flex: 2;
}
</style>