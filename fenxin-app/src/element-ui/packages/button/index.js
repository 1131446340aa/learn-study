/*
 * @Descripttion: 
 * @Date: 1985-10-26 16:15:00
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-28 18:04:29
 */ 
import ElButton from './src/button.vue';

/* istanbul ignore next */
ElButton.install = function(Vue) {
  Vue.component(ElButton.name, ElButton);
};

export default ElButton;
