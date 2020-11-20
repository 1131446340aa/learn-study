/*
 * @Descripttion: 
 * @Date: 2020-07-28 18:02:00
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-29 12:56:42
 */ 
import ElFormItem from '../form/src/form-item.vue';

/* istanbul ignore next */
ElFormItem.install = function(Vue) {
  Vue.component(ElFormItem.name, ElFormItem);
};

export default ElFormItem;
