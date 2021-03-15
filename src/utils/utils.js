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