// 节流
export const throttle = function(fn, interval) {
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

// 得到对象键值对拼接后的字符串
export const reduce = (style) => {
  return () => {
    let arr = Object.entries(style.value || style);
    return arr.reduce((total, item) => {
      return total + `${item[0]}:${item[1]};`;
    }, "");
  }
}