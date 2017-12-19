<template>
  <div class="log-page">
    <h3>这是一个调试页面</h3>
    <p>运行日志将在 10分钟后自动清除</p>
    <br>
    <router-link :to="{name: 'error404'}">前往错误页面</router-link>
    <br>
    <button class="btn clear-btn" @click="clean">清除日志</button>
    <ul class="log-list">
      <li>日志列表</li>
      <li v-for="(log, index) in list" :key="index">{{log}}</li>
    </ul>
  </div>

</template>
<script>
import { getLog, cleanLog } from 'src/assets/scripts/local-storage';

export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    clean() {
      cleanLog();
      this.list = [];
    },
  },
  mounted() {
    this.list = getLog();
  },
  activated() {
    this.list = getLog();
  },
};
</script>
<style lang="scss" scoped>
.log-page {
  position: relative;
  z-index: 1;
  background-color: #fff;
  text-align: center;
  height: 100vh;
  overflow-y: auto;
}
.log-list {
  text-align: left;
}
.clear-btn {
  border: none;
  padding: 10px;
  margin: 20px auto;
  background-color: #aaa;
}
</style>
