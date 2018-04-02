import router from 'src/router/index';

// 百度统计
const baiduAnalytics = route => {
  const { name, params, query, hash } = route;
  const { href } = router.resolve({ name, params, query, hash });
  if (typeof _hmt !== 'undefined') {
    _hmt.push(['_trackPageview', href]);
  }
};

export default route => {
  baiduAnalytics(route);
};
