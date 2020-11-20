/*
 * @Descripttion: 
 * @Date: 2020-07-28 18:02:00
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-29 12:41:00
 */ 
import ElForm from './src/form.vue';

/* istanbul ignore next */
ElForm.install = function(Vue) {
  Vue.component(ElForm.name, ElForm);
};

export default ElForm;
