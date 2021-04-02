export default function(app, options) {
  // 注册一个全局自定义指令 `v-focus`
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