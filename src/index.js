import './styles/var.styl';

import Vue from 'vue';

let vue = new Vue({
  id: '#app',
  data: {
    name: '小崔'
  },
  template: '<div>123456</div>'
}).$mount('#app');

console.log(vue);