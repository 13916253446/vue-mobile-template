
import viewportUnitsBuggyfill from 'viewport-units-buggyfill';
import viewportUnitsBuggyfillHacks from 'viewport-units-buggyfill/viewport-units-buggyfill.hacks.js';
import fastclick from 'fastclick';
//  解决实例化的对象方法polyfill(例: [1,2,3].includes)
import 'babel-polyfill';

//  处理vw单位兼容性
window.onload = () => {
  viewportUnitsBuggyfill.init({
    hacks: viewportUnitsBuggyfillHacks
  });
  // 处理点击延迟
  fastclick.attach(document.body);
};

