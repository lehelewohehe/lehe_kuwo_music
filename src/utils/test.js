// ref rective 测试代码，该例子是在player组件的环境下写的
// let a = reactive({
//   list: [
//     {icon: "icondanqubofang", text: "单曲播放", status: ""},
//     {icon: "icondanquxunhuan", text: "单曲循环", status: ""},
//     {icon: "iconzu4163", text: "顺序播放", status: ""},
//     {icon: "iconxunhuanbofang", text: "循环播放", status: ""},
//     {icon: "iconsuijibofang", text: "随机播放", status: ""}
//   ],
//   currentIndex: 0,
//   isMode: false
// });

// let b = reactive({mode});
// console.log(mode);
// console.log(a);
// console.log(b, b.mode);

// 解构后对响应式的影响以及使用toRefs对响应式的保持测试
// console.log(props, 890);
// {
// let {circleStyle, progressStyle, percent, vertical, tooltip, max} = props;
// console.log(circleStyle, progressStyle, percent, vertical, tooltip, max);
// }
// let {circleStyle, progressStyle, percent, vertical, tooltip, max} = toRefs(props);
// console.log(circleStyle, progressStyle, percent, vertical, tooltip, max);
// 歌词格式化正则表达式测试
// console.log(lyricDetail.value.lyric, lyricDetail.value.lyric.split(/\[[0-9:\.]+\]/g),lyricDetail.value.lyric.match(/\[[0-9:\.]+\]/g), lyricDetail.value.lyric.split(/\cJ/g));