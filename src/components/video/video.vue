<template>
  <div>
    <video ref="videoPlayer" class="video-js"></video>
  </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import {ref, onMounted, onBeforeUnmount, toRefs, nextTick} from "vue";
export default {
  name: "VideoPlayer",
  props: {
    src: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  setup(props, context) {
    let player = ref(null);
    let videoPlayer = ref(null);
    let {src} = toRefs(props);
    console.log(src);
    let options = {
      autoplay: true,
      controls: true,
      sources: [
        {src: src.value,type: "video/mp4"}
      ]
    };
    onMounted(async () => {
      await nextTick();
      player.value = videojs(videoPlayer.value, options, function onPlayerReady() {
        console.log('onPlayerReady');
      })
    });

    onBeforeUnmount(() => {
      player.value && player.value.dispose();
    });
    return {
      player,
      videoPlayer
    }
  }
}
</script>
<style lang="scss">
.video-js {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>