import { isiOS, isWechat } from 'src/assets/scripts/util';

const isServer = process.env.VUE_ENV === 'server';

/**
 * 浏览器下设置title，解决微信改不了title 的 bug
 */
function setTitle(title) {
  document.title = title;
  const userAgent = window.navigator.userAgent.toLowerCase();
  const iniOS = isiOS();
  const inWechat = isWechat();
  if (iniOS && inWechat) {
    const iframe = document.createElement('iframe');
    iframe.src = '//www.baidu.com/favicon.ico';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.onload = function () {
      setTimeout(() => {
        iframe.remove();
      }, 0);
    };
  }
}

function getTitle(vm) {
  const { title } = vm.$options;
  if (title) {
    return typeof title === 'function' ?
      title.call(vm) :
      title;
  }
}

const serverTitleMixin = {
  created() {
    const title = getTitle(this);
    if (title) {
      this.$ssrContext.title = `Vue 模板 | ${title}`;
    }
  },
};

const clientTitleMixin = {
  mounted() {
    const title = getTitle(this);
    if (title) {
      setTitle(`Vue 模板 | ${title}`);
    }
  },
};

export default isServer ? serverTitleMixin : clientTitleMixin;
