/*
 * @Descripttion: 
 * @Date: 2020-07-28 18:02:00
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-29 13:54:03
 */ 
import ElInput from './src/input.vue';

/* istanbul ignore next */
ElInput.install = function(Vue) {
  Vue.component(ElInput.name, ElInput);
};

export default ElInput;
