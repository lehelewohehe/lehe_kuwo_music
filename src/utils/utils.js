import axios from "axios";
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

// 格式化歌词
export const parseLyric = function(lyric) {
  // console.log(lyric);
  let rowArr = lyric.split(/\cJ/g);
  let lyricArr = [];
  rowArr.forEach(row => {
    if(!row) return;
    row = row.slice(1);
    let arr = row.split("]");
    let numArr = arr[0].split(":");
    !!arr[1] && lyricArr.push({time: Number((Number(numArr[0])*60+Number(numArr[1])).toFixed(3)), text: arr[1]});
    // console.log(arr, numArr);
  });
  // console.log(lyricObj);
  return lyricArr;
}

/**
 * 导出文件方法
 * @param {String} method [请求方式]
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {String} fileName [导出的文件名，例：test.xlsx]
 */
export function downloadFile(url, fileName, method="post", params) {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      params: params,
      responseType: 'blob'
    })
    .then(res => {
      let reader = new FileReader();
      let data = res.data;
      reader.onload = e => {
        if (e.target.result.indexOf('Result') != -1 && JSON.parse(e.target.result).Result == false) {
          // 进行错误处理
        } else {
          if (!fileName) {
            let contentDisposition = res.headers['content-disposition'];
            if (contentDisposition) {
              fileName = window.decodeURI(res.headers['content-disposition'].split('=')[2].split("''")[1], "UTF-8");
            }
          }
          executeDownload(data, fileName);
        }
      };
      reader.readAsText(data);
      resolve(res.data);
    })
  });
}


//  模拟点击a 标签进行下载
function executeDownload(data, fileName) {
  if (!data) {
    return
  }
  let url = window.URL.createObjectURL(new Blob([data]));
  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}