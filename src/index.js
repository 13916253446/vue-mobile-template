
import viewportUnitsBuggyfill from 'viewport-units-buggyfill';
import viewportUnitsBuggyfillHacks from 'viewport-units-buggyfill/viewport-units-buggyfill.hacks.js';
import fastclick from 'fastclick';


//  处理vw单位兼容性
window.onload = () => {
  viewportUnitsBuggyfill.init({
    hacks: viewportUnitsBuggyfillHacks
  });
  // 处理点击延迟
  fastclick.attach(document.body);
};
