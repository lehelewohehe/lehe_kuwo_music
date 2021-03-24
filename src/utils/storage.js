// 所有的localstorage key
const myLocalKeys = {
	LEHE_ACCOUNT_INFO: "lehe_account_info"
}
/**
 * localstorage标准封装
 */
const myLocal = {
  //存储
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  //取出数据
  get(key) {
		const value = localStorage.getItem(key);
    try {
      if (value === null || value === undefined || value === "") {
        return null;
      }
      return JSON.parse(localStorage.getItem(key));
    } catch (err) {
      return value || null
    }
  },
  // 删除数据
  remove(key) {
    localStorage.removeItem(key);
  },
	keys: myLocalKeys
}
/**
 * sessionStorage标准封装
 */
const mySession = {
  //存储
  set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  //取出数据
  get(key) {
    try {
      const value = sessionStorage.getItem(key);
      if (value === null || value === undefined || value === "") {
          return null;
      }
      return JSON.parse(sessionStorage.getItem(key));
    } catch (err) {
      return null
    }
  },
  // 删除数据
  remove(key) {
    sessionStorage.removeItem(key);
  }
}

// 有时间限制的本地存储的key
let timeLocalKeys = {
  LEHET_COOKIE: "lehet_cookie",
  LEHET_TOKEN: "lehet_token",
  LEHET_PROFILE: "lehet_profile"
}

/**
 * localstorage定时缓存封装，设置缓存时如果没有设置时间,单位分钟，默认60 * 24 * 3分钟
 */
const timeLocal = {
  //存储
  set(key, value, time) {
    try {
      if (!localStorage) {
          return null;
      }
      //如果没有设置时间或者为NaN,则设置默认时间为72小时
      if (!time || isNaN(time)) {
          time = 60 * 24 * 3;
      }
      //过期时间的毫秒数
      const endTime = (new Date()).getTime() + time * 60 * 1000;
      // 将时间和值一起存储
      localStorage.setItem(key, JSON.stringify({ data: value, time: endTime }));
    } catch (e) {
      return null;
    }
  },
  //取出数据
  get(key) {
    try {
      if (!localStorage || !localStorage.getItem(key)) {
        return null;
      }
      //获取缓存数据
      const result = JSON.parse(localStorage.getItem(key));
      //目前时间的毫秒数
      const now = (new Date()).getTime()
      //如果缓存时间过期则移除数据
      if (now > result.time) {
        this.remove(key);
        return null;
      }
      return result.data;
    } catch (e) {
      this.remove(key);
      return null;
    }
  },
  // 删除数据
  remove(key) {
    localStorage.removeItem(key);
  },
  keys: timeLocalKeys
}

// 暴露给外部访问
export {
  myLocal,
  mySession,
  timeLocal
};