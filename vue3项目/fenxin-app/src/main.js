import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementUI from './element-ui/src/index.js'
import './element-ui/lib/theme-chalk/index.css'
// import MyElement from './util/Element'
const { Button, Input ,Popover} = ElementUI
// export default new MyElement({Message})
createApp(App)
  .use(router)
  .use(Button)
  .use(Input)
  .use(Popover)
  .mount('#app')
