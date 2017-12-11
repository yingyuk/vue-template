# vue template

包含
Server-Side Rendering\
Service Worker\
图片懒加载\
微信登录\
微信支付\
微信分享

```sh
# 安装
npm install # or yarn
# 开发
npm run dev
# 打包
npm run build
```

## 开启 Service Worker

编辑`config/index.js`\
build.serviceWorker: true\
dev.serviceWorker: true\

编辑 `build/webpack.client.conf.js`\
`SWPrecachePlugin`的路由缓存配置
