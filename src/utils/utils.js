// 节流
export const throttle = function(fn, interval=100) {
  let pre = new Date().getTime();
  return function() {
   let now = new Date().getTime();
   let _this = this;
   let args = arguments;
   if(now - pre > interval) {
     fn.apply(_this, args);
     pre = new Date().getTime();
   }
  }
}

// 防抖
export function debounce(func,wait) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout);
    let callNow = !timeout;
    timeout = setTimeout(() => {
      timeout = null;
    }, wait)
    if (callNow) func.apply(context, args)
  }
}


// 得到对象键值对拼接后的字符串
export const reduce = (style) => {
  return () => {
    let arr = Object.entries(style.value || style);
    return arr.reduce((total, item) => {
      return total + `${item[0]}:${item[1]};`;
    }, "");
  }
}