import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import {
  Button,
  Icon,
  NavBar,
  Swipe,
  SwipeItem,
  Tab,
  Tabs,
  Lazyload,
  Image as VanImage,
  Search,
  Slider,
  Collapse,
  CollapseItem,
  Field
} from 'vant'

const app = createApp(App)
app
  .use(router)
  .use(Button)
  .use(Collapse)
  .use(CollapseItem)
  .use(Icon)
  .use(Field)
  .use(Tab)
  .use(Tabs)
  .use(Swipe)
  .use(NavBar)
  .use(SwipeItem)
  .use(Lazyload)
  .use(VanImage)
  .use(Search)
  .use(Slider)
  .mount('#app')
