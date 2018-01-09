<template>
  <article id="home">
    <div ref="container" class="swiper-container" style="height: 100vh">
      <div class="swiper-wrapper">
        <div class="swiper-slide" data-hash="page1">
          <h1>这是首页</h1>
          <img v-lazy=" 'https://www.baidu.com/img/bd_logo1.png' + 'error' ">
          <hr>
          <router-link :to="{name: 'detail'}">跳转详情页</router-link>
          <hr>
          <h2>这是file-loader</h2>
          <img :src="fileLoaderSample">
          <hr>
          <my-video ref="myVideo" :playing.sync="videoPlaying" />
          <button @click="playVideo">播放视频</button>
          <div class="javascript-list">
            <div v-for="(item, index) in list">
              <h3>{{item.name}}</h3>
              &nbsp;&nbsp;&nbsp;&nbsp;star: {{item.stargazers_count}}</div>
          </div>
        </div>
        <div class="swiper-slide" data-hash="page2">Slide 2</div>
        <div class="swiper-slide" data-hash="page3">Slide 3</div>
      </div>
    </div>
  </article>
</template>
<script>
import myVideo from 'src/components/my-video/my-video';
import 'swiper/dist/css/swiper.min.css';
import Swiper from 'swiper';
import 'src/assets/scriptloaderassets/hb.modernizr.pack.min.1.0.0.js';
import { mapState } from 'vuex';

export default {
  name: 'home',
  data() {
    return {
      mySwiper: null,
      pageIndex: 0,
      // 视频播放状态
      videoPlaying: false,
      fileLoaderSample: require('src/assets/fileloaderassets/share.png'),
    };
  },
  computed: {
    ...mapState({
      list: state => state.home.list,
    }),
  },
  watch: {
    list() {
      this.$nextTick(() => {
        this.$refs.scroll && this.$refs.scroll.update();
      });
    },
  },
  asyncData({ store }) {
    return store.dispatch('home/fetchList', { isFirstFetch: true });
  },
  title() {
    // 调用的时候绑定了 this
    return '这是首页';
  },
  methods: {
    rebuildSwiper() {
      this.mySwiper && this.mySwiper.destroy(false);
      this.buildSwiper();
    },
    buildSwiper() {
      const vm = this;
      const { container } = this.$refs; // 容器
      const config = {
        direction: 'vertical', // 垂直滚动
        initialSlide: 0,
        // 注意不要跟 vue-router 的 hash 模式冲突了, 两者不可共用
        hashNavigation: {
          replaceState: true, // 翻页不产生历史记录
        },
        on: {
          slideChange() {
            // 在 vue 中存储状态
            vm.$set(vm, 'pageIndex', this.realIndex);
          },
          resize() {
            vm.$nextTick(() => {
              vm.mySwiper.update(true);
            });
          },
        },
      };
      this.mySwiper = new Swiper(container, config);
    },
    updateSwiper() {
      this.$nextTick(() => {
        if (this.mySwiper) {
          this.mySwiper.update(true);
        } else {
          this.buildSwiper();
        }
      });
    },
    playVideo() {
      this.$refs.myVideo && this.$refs.myVideo.play();
    },
    initHome() {
      this.updateSwiper();
      this.$store.dispatch('home/fetchList', { isFirstFetch: true });
    },
  },
  mounted() {
    this.initHome();
  },
  components: {
    myVideo,
  },
};
</script>
<style lang="scss" scoped>
// @import '~src/assets/styles/mixin.scss';
p {
  outline: none;
}
</style>
