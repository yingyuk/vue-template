<template>
  <article id="home">
    <div ref="container" class="swiper-container" style="height: 100vh">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <h1>这是首页</h1>
          <img v-lazy=" 'https://www.baidu.com/img/bd_logo1.png' + 'error' " alt="">
          <hr>
          <router-link :to="{name: 'detail'}">跳转详情页</router-link>
          <hr>
          <div contenteditable="true" @input="inputHandler" v-text="userInput"></div>
          <input v-model="userInput" type="text">
        </div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
      </div>
    </div>
  </article>
</template>
<script>
import 'swiper/dist/css/swiper.min.css';

let Swiper;
if (!IS_SERVER) {
  Swiper = require('swiper/dist/js/swiper.js');
}

export default {
  name: 'home',
  data() {
    return {
      userInput: '双击修改数据',
      mySwiper: null,
      pageIndex: 0,
    };
  },
  asyncData({ route, store }) {
    return Promise.resolve();
  },
  title() { // 调用的时候绑定了 this
    return this.user ? this.user.id : '这是首页';
  },
  methods: {
    inputHandler(e) {
      this.userInput = e.target.innerText;
    },
    rebuildSwiper() {
      this.mySwiper && this.mySwiper.destroy(false);
      this.buildSwiper();
    },
    buildSwiper() {
      const $container = this.$refs.container; // 容器
      this.mySwiper = new Swiper($container, {
        direction: 'vertical', // 垂直滚动
        hashnav: true, // 使用 hash
        hashnavWatchState: true, // 监听地址栏的 hash
        replaceState: true, // 翻页不产生历史记录
        mousewheelControl: true, // 添加鼠标控制
        onSlideChangeStart: (swiper) => {
          this.pageIndex = swiper.activeIndex;
        },
        onAfterResize: (swiper) => {
          this.$nextTick(() => {
            this.mySwiper.update(true);
          });
        },
      });
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
  },
  mounted() {
    this.updateSwiper();
    // this.fetch({
    //   method: 'GET',
    //   url: '/search/repositories?q=javascript&sort=stars',
    // });
  },
};

</script>
<style lang="scss" scoped>
/*@import '~src/assets/styles/mixin.scss';*/

p {
  outline: none;
}

</style>
