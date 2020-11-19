
基础知识

首先路由分为hash路由和历史路由

hash路由 前面有一个# 

history 路由是h5新加的属性，需要后端进行支持，要不然刷新很容易发现页面不存在

同时新加了两个api对其控制，pushState replaceState

准备工作

首先 我们平时写的路由 是一个数组，数组里面都有一个对象，对象都有path和component属性，我们第一步要做的就是遍历数组，生成一个对象，将path的值当做键名，component的值当作value。


我们还要初始化路由，比如我们使用hash模式，location.hashName = '/#'

然后我们还要根据路由模式分别监听 hashChange 和popstate 方法

当路由改变的时候 ，使用一个指针指向当前路由。


核心工作: 

通过mixins 混入beforeCreate 生命周期，这这里拿到参数router，然后拦截router和route属性

vue-router 注册了两个组建 router-view 和router-link

router-view 直接调用render函数渲染组建就行

router-link 也差不多，主要是多了一些属性，比如href 样式，还有一个默认点击事件 ，默认标签
