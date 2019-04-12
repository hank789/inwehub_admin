# inwehub_admin
管理后台

vue-element-admin
  doc. https://panjiachen.github.io/vue-element-admin-site/zh/guide/#功能
  source. https://github.com/PanJiaChen/vue-element-admin
  demos https://panjiachen.github.io/vue-element-admin/
  UI-demos http://element-cn.eleme.io/#/zh-CN
# 开发环境
npm run dev

# 打包正式环境
npm run build:prod

# 打包测试环境
npm run build:stage

[临时测试登陆]
http://localhost:9527/#/login?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHBzOi8vYXBpLnl3aHViLmNvbS9hcGkvYXV0aC9sb2dpbiIsImlhdCI6MTU1NDIwMjg5NSwiZXhwIjoxNTU1NDEyNDk1LCJuYmYiOjE1NTQyMDI4OTUsImp0aSI6IkhwREhEUFJTTUhvOVdIeDcifQ.YVCeAJJaZDLUlk7MpcT0TjlRhwS0HE3oCYiUfxJ1Ws8

[更换index.html引入目录]
vue.config.js
publicPath: '/admin/',

