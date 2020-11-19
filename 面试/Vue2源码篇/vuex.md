首先vuex 分为5大模块 

state mutations actions getters modules 

vuex是响应式的，所以使用new Vue 对state进行包装一下

首先存在modules，我们要对整个仓库的数据进行一下简单的整合

也就是收集模块，将modules里面的所有模块都放在一个children属性上，state放在state属性上，这层的仓库放在一个raw属性上，children属性是一个对象，键名子仓库名


收集模块后然后就要对模块进行安装 
安装的话就是遍历收集到的模块，把模块中的state属性劫持 到this.state 上

把模块中的所有getter 劫持到最外层的getters上仓库this，

actions和mutations 是一样的，将所有仓库中的同名方法放在队列中，

分别使用dispatch 和commit方法。

dispatch和commit 也基本一样，只是第一个参数，一个代表的是store ，一个代表的是state


