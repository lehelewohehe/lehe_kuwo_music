import {nextTick} from "vue";
import {throttle} from "../utils/utils.js";
import defaultImg from "../assets/imgs/unlogin_avatar.jpg";
// 跳转到顶部的锚点
export function JumpAnchor(app, options) {
  // 注册一个全局自定义指令 `v-anchor`
  let anchor = document.createElement("div");
  app.directive("anchor", {
    // 当被绑定的元素挂载到 DOM 中时……
    mounted(el, binding) {
      anchor.className = "v-anchor";
      anchor.style.display = "none";
      anchor.innerHTML = `<i class="iconfont iconshang"></i>`;
      if(Object.prototype.toString.call(binding.value) == "[object Object]") {
        Object.keys(binding.value).forEach((key) => {
          ["left", "right", "bottom", "top"].includes(key) 
          ? anchor.style[key] = binding.value[key] : "";
        })
      }else {
        anchor.style["bottom"] = "10px";
        anchor.style["right"] = "10px";
      }
      anchor.onclick = function() {
        el.scrollTop = 0;
      };
      el.onscroll = function() {
        if(el.scrollTop > 200) {
          anchor.style.display = "flex";
        } else {
          anchor.style.display = "none";
        }
      }
      el.appendChild(anchor);
    },
    beforeUnmount(el) {
      anchor.onclick = null;
      el.onscroll = null;
    }
  });
}

// 自定义滚动条
export function ScrollBar(app, options) {
  let scrollFunc = null;
  let mousemoveFunc = null;
  let mousedownFunc = null;
  let mouseupFunc = null;
  let map = new WeakMap();
  // 注册一个全局指令v-scroll 用于自定义滚动条
  app.directive("scroll", {
    mounted(el, binding) {
      let wrapper = document.createElement("div");
      let inner = document.createElement("div");
      let startY = 0;
      let observer = null;
      inner.classList.add("v-scroll__inner");
      wrapper.classList.add("v-scroll__wrapper");
      wrapper.appendChild(inner);
      el.classList.add("hide-scrollbar");
      // 选择需要观察变动的节点
      // 观察器的配置（需要观察什么变动）
      const config = {childList: true, subtree: true};
      // 当观察到变动时执行的回调函数
      const callback = function(mutationsList, observer) {
        let {scrollHeight, clientHeight} = el;
        let scrollBarHeight = Math.floor(clientHeight / scrollHeight * clientHeight);
        const _el = el.getElementsByClassName("v-scroll__wrapper");
        inner.style.height = scrollBarHeight + "px";
        if(scrollHeight != clientHeight) {
          !_el.length && el.appendChild(wrapper);
        } else {
          _el.length && el.removeChild(wrapper);
        }
      };
      // 创建一个观察器实例并传入回调函数
      observer = new MutationObserver(callback);
      // 以上述配置开始观察目标节点
      observer.observe(el, config);
      map.set(el, observer);

      // 滚动事件绑定的回调，节流
      scrollFunc = throttle(function() {
        let {scrollTop, scrollHeight, clientHeight} = el;
        inner.style.top = scrollTop / scrollHeight * clientHeight + "px";
      }, 30);
      // 鼠标移动事件绑定的回调，节流
      mousemoveFunc = throttle(function(e) {
        let {clientHeight, scrollHeight} = el;
        let max = clientHeight - inner.clientHeight;
        let currentTop = inner.style.top ? parseInt(inner.style.top) : 0;
        let top = e.pageY - startY + currentTop;
        startY = e.pageY;
        top = top > max ? max : top;
        top = top < 0 ? 0 : top;
        inner.style.top = top + "px";
        el.scrollTop = Math.ceil(top / max * (scrollHeight - clientHeight));
      }, 30);
      // 鼠标按下事件的回调
      mousedownFunc = function(e) {
        startY = e.pageY;
        el.removeEventListener("scroll", scrollFunc);
        document.addEventListener("mousemove", mousemoveFunc);
      };
      // 鼠标抬起事件的回调
      mouseupFunc = function(e) {
        el.addEventListener("scroll", scrollFunc);
        document.removeEventListener("mousemove", mousemoveFunc);
        startY = 0;
      };
      el.addEventListener("scroll", scrollFunc);
      inner.addEventListener("mousedown", mousedownFunc);
      document.addEventListener("mouseup", mouseupFunc);
    },
    beforeUnmount(el) {
      el.removeEventListener("scroll", scrollFunc);
      inner.removeEventListener("mousedown", mousedownFunc);
      document.removeEventListener("mouseup", mouseupFunc);
      // 之后，可停止观察
      map.get(el).disconnect();
    }
  });
}

// 加载loading
export function Loading(app, options) {
  let mapEl = new WeakMap();
  app.directive("loading", {
    beforeMount(el, binding){
      el.style.minHeight = "100px";
      let loadEl = document.createElement("div");
      loadEl.classList.add("v-loading");
      loadEl.innerHTML = `<i class="iconfont iconloading"></i>`;
      mapEl.set(el, loadEl);
      el.appendChild(loadEl);
    },
    updated(el, binding) {
      if(!Boolean(binding.value)) {
        el.style.minHeight = "";
        mapEl.has(el) && el.removeChild(mapEl.get(el));
        mapEl.delete(el);
      }
    }
  });
}

// 图片懒加载
export function Lazy(app, options) {
  let {error, init} = options;
  let map = new Map();
  let boxRect = null;
  let boxEl = null;
  let callback = throttle(function() {
    for(let item of map) {
      let img = item[0];
      let src = item[1];
      console.log(src, 123)
      let {top: imgTop} = img.getBoundingClientRect();
      console.log(imgTop, img)
      if(imgTop - boxRect.top < boxRect.height) {
        img.src = src;
        map.has(img) && map.delete(img);
      } 
    }
  }, 30);
  nextTick(() => {
    boxEl = document.getElementById("p-app__container");
    boxRect = boxEl.getBoundingClientRect();
    boxEl.addEventListener("scroll", callback);
  });
  
  app.directive("lazy", {
    async mounted(el, binding) {
      el.src = defaultImg;
      map.set(el, binding.value);
      await nextTick();
      callback();
    },
    beforeUnmount(el) {
      // boxEl.removeEventListener("scroll", callback);
    }
  });
}