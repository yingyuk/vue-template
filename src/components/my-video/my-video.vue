// iOS 支持的视频格式有 
// .mov, .mp4, .m4v, .3gp
// 不支持的格式,将不能播放, 比如 .ogg
<template>
  <div @click.stop class="video-wrap">
    <video width="100%" :poster="poster" :src="src" ref="video" @loadedmetadata="loadedmetadata"
      @timeupdate="timeupdate" :controls="playing" controlsList="nodownload" x-webkit-airplay="true"
      webkit-playsinline="true" playsinline="true" preload="metadata" x5-video-player-type="h5"
      x5-video-player-fullscreen="false" class="video"></video>
  </div>
</template>
<script>
import event from 'src/event/index';

export default {
  name: 'myVideo',
  props: {
    src: {
      type: String,
      default: 'https://www.w3cschool.cn/statics/demosource/mov_bbb.mp4',
    },
    playing: {
      type: Boolean,
      default: false,
    },
    poster: true,
  },
  data() {
    return {
      // playing: false,
    };
  },
  methods: {
    play() {
      // 不能使用 nextTick, 否则会报 NotAllowedError 错误
      // 因为 nextTick 的延迟,让浏览器认为播放是由 JS 控制的, 而不是 用户行为导致的; 不允许播放
      this.$refs.video.play().catch(err => console.error(err));
    },
    pause() {
      this.$refs.video.pause();
    },
    changeStatus(flag) {
      this.$emit('update:playing', flag);
    },
    loadedmetadata() {
      // 元数据加载完毕
    },
    timeupdate() {
      // 当前播放到 this.$refs.video.currentTime
    },
    init() {
      this.$nextTick(() => {
        const player = this.$refs.video;
        // 通知父元素, 播放事件
        player.addEventListener('play', () => {
          this.changeStatus(true);
          event.$emit('playVideo', player);
        });

        player.addEventListener('pause', () => {
          this.changeStatus(false);
        });

        // 🚫 禁止同时播放两个视频
        event.$on('playVideo', refs => {
          const notSelf = refs !== player;
          const isPlaying = this.playing;
          // 播放另一个视频, 并且自己也在播放, 就暂停自己
          if (notSelf && isPlaying) {
            this.pause();
          }
        });
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.video-wrap {
  position: relative;
  z-index: 10;
  .video {
    width: 100%;
    height: auto;

    object-fit: cover;

    // 隐藏 iOS 控制栏内按钮 [播放, 全屏, TV], 但会留下控制栏
    // &::-webkit-media-controls-panel {
    //   display: none !important;
    //   -webkit-appearance: none;
    // }

    // 隐藏 iOS控制栏的播放按钮
    // &::-webkit-media-controls-play-button {
    //   display: none !important;
    //   -webkit-appearance: none;
    // }

    // 隐藏 iOS 的 悬浮在视频中央的播放按钮
    &::-webkit-media-controls-start-playback-button {
      display: none !important;
      -webkit-appearance: none;
    }
  }
}
</style>
