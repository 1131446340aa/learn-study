/*
 * @Descripttion: 
 * @Date: 2020-07-28 18:02:00
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-29 14:17:41
 */ 
import ElDialog from './src/component.vue';

/* istanbul ignore next */
ElDialog.install = function(Vue) {
  Vue.component(ElDialog.name, ElDialog);
};

export default ElDialog;
