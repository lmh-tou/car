# 项目介绍

<<<<<<< HEAD
> 本项目为前后端分离项目~
=======
> 本项目为前后端分离项目
>>>>>>> a059bf0dba06de67116b58eae105fb00c2178a76

## 项目构成

> server文件夹、vue-node-demo文件夹、readme文件

### server

> 此文件夹用于存储后端代码。api文件夹存储后端接口、node_modules文件夹存储项目所需模块及配置、utils存储配置数据库有关信息、.gitignore文件用于忽略不上传到github的模块、sqlMap文件存储sql语句

### vue-node-demo

> assets用于存储图片等静态资源

> pages存储各个页面

> app.vue是项目的入口

> router配置路由

> vue.config.js文件夹用来设置代理

# 运行

# 在终端中进入server文件夹

```
npm install
```

```
nodemon index
```

# 在终端进入vue-node-demo文件夹

```
npm install
```

```
npm run serve
```

# 注意
> 如果只写前端界面不关注后端逻辑的话可以不用运行server文件夹，登录界面写在vue-node-demo/src/pages/login中，代码完成或完成一部分可上传到创建的lmh-tou中，双方都可看到修改的代码并进行更新。若想连接数据库请看server下的utils文件夹