import {nextTick} from "vue";
import {throttle} from "../utils/utils.js";
export function jumpAnchor(app, options) {
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

export function customScrollBar(app, options) {
  let scrollFunc = null;
  let observer = null;
  let mousemoveFunc = null;
  let mousedownFunc = null;
  let mouseupFunc = null;
  let startY = 0;
  // 注册一个全局指令v-scroll 用于自定义滚动条
  app.directive("scroll", {
    mounted(el, binding) {
      let wrapper = document.createElement("div");
      let inner = document.createElement("div");
      inner.classList.add("v-scroll__inner");
      wrapper.classList.add("v-scroll__wrapper");
      wrapper.appendChild(inner);
      el.appendChild(wrapper);
      el.classList.add("hide-scrollbar");
      // 选择需要观察变动的节点
      // 观察器的配置（需要观察什么变动）
      const config = {childList: true, subtree: true};
      // 当观察到变动时执行的回调函数
      const callback = function(mutationsList, observer) {
        let {scrollHeight, clientHeight} = el;
        let scrollBarHeight = Math.floor(clientHeight / scrollHeight * clientHeight);
        inner.style.height = scrollBarHeight + "px";
      };
      // 创建一个观察器实例并传入回调函数
      observer = new MutationObserver(callback);
      // 以上述配置开始观察目标节点
      observer.observe(el, config);

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
      observer.disconnect();
    }
  });
}