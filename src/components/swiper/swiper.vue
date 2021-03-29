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
        :class="classes[index]"><img 
        :src="item.pic"><div></div></li>
      </ul>
      <span class="next" @click="before" v-show="showArrow">
        <i class="iconfont iconyou"></i>
      </span>
    </div>
  </div>
  <div class="list">
    <!-- 指示灯 -->
    <span class="btn" v-for="(item, index) in classes" 
    :key="index" :class="[item == 'center' ? 'active' : '']"></span>
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
  left: -30%;
  transform: scale(0.8);
  z-index: 4;
  background: rgb(0,0,0);
  transition: all 0.5s ease;
}
.center{
  z-index: 6;
  left: 0;
  top: 0;
  bottom: 10%;
  transition: all 0.5s ease;
}
.right{
  left: 30%;
  transform: scale(0.8);
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
  transition: all 0.3s ease;
}
.other{
  z-index: 3;
  left: 0;
  top: 0;
  visibility: hidden;
  transform: scale(0);
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
  top:45%;
  color: rgba(255,255,255,0.6);
  .iconfont {
    font-size: 26px;
  }
}
.list{
  width: 30%;
  height: 5px;
  display: flex;
  margin: 0 auto;
  margin-top: 20px;
}
.btn{
  transition: all 0.3s ease;
  flex: 1;
  background: rgb(244,244,244);
}
.btn:not(:first-child){
  margin-left: 20px;
}
.last{
  left: -16%;
}
.next{
  right: -16%;
}
// 指示灯
.btn.active {
  background: #f00;
}
</style>